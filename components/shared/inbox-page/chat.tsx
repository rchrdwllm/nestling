import ChatBubble from "./chat-bubble";
import { useCurrentUser } from "@/hooks/use-current-user";
import { pusherClient } from "@/lib/pusher";
import { useEffect, useRef, useState, useCallback, Fragment } from "react";
import { MessageWithFiles } from "@/types";
import { generateChannelId } from "@/lib/utils";
import { getChannelMessages } from "@/lib/message";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { format, isSameDay } from "date-fns";
import DateDivider from "./date-divider";

type ChatProps = {
  receiverId: string;
  prevMessages?: MessageWithFiles[];
  hasMore?: boolean;
};

const Chat = ({
  receiverId,
  prevMessages = [],
  hasMore: initialHasMore = true,
}: ChatProps) => {
  const { user } = useCurrentUser();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [chatData, setChatData] = useState<MessageWithFiles[]>(prevMessages);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [lastScrollHeight, setLastScrollHeight] = useState(0);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [lastMessageCount, setLastMessageCount] = useState(prevMessages.length);
  const [isLoadingHistorical, setIsLoadingHistorical] = useState(false);
  const loadMoreMessages = useCallback(async () => {
    if (!user || !receiverId || isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    setIsLoadingHistorical(true);
    setShouldAutoScroll(false);
    const channelId = generateChannelId(user.id, receiverId);
    const oldestMessage = chatData[0];

    let result: any = null;
    try {
      result = await getChannelMessages(
        channelId,
        20,
        oldestMessage?.timestamp
      );

      if (result.success) {
        setChatData((prev) => [
          ...(result.success as MessageWithFiles[]),
          ...prev,
        ]);
        setHasMore(result.hasMore || false);

        if (scrollContainerRef.current) {
          setLastScrollHeight(scrollContainerRef.current.scrollHeight);
        }
      }
    } catch (error) {
      console.error("Error loading more messages:", error);
    } finally {
      setIsLoadingMore(false);
      setTimeout(() => {
        setIsLoadingHistorical(false);
        setLastMessageCount(chatData.length + (result?.success?.length || 0));
      }, 200);
    }
  }, [user, receiverId, chatData, isLoadingMore, hasMore]);

  const handleScroll = useCallback(
    (e: Event) => {
      const target = e.target as HTMLDivElement;
      if (target.scrollTop === 0 && hasMore && !isLoadingMore) {
        loadMoreMessages();
      }
    },
    [hasMore, isLoadingMore, loadMoreMessages]
  );

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    if (scrollContainerRef.current && lastScrollHeight > 0) {
      const newScrollHeight = scrollContainerRef.current.scrollHeight;
      const scrollDiff = newScrollHeight - lastScrollHeight;

      scrollContainerRef.current.scrollTop = scrollDiff;

      setLastScrollHeight(0);
      setTimeout(() => setShouldAutoScroll(true), 100);
    }
  }, [chatData, lastScrollHeight]);

  useEffect(() => {
    if (
      chatContainerRef.current &&
      shouldAutoScroll &&
      !isLoadingMore &&
      !isLoadingHistorical
    ) {
      const hasNewMessages = chatData.length > lastMessageCount;

      if (hasNewMessages || isInitialLoad) {
        chatContainerRef.current.scrollIntoView({
          behavior: isInitialLoad ? "auto" : "smooth",
          block: "end",
        });

        if (isInitialLoad) {
          setIsInitialLoad(false);
        }
      }

      setLastMessageCount(chatData.length);
    }
  }, [
    chatData,
    isInitialLoad,
    isLoadingMore,
    shouldAutoScroll,
    lastMessageCount,
    isLoadingHistorical,
  ]);

  useEffect(() => {
    if (user && receiverId) {
      const channelName = generateChannelId(user.id, receiverId);

      pusherClient.subscribe(channelName);

      pusherClient.bind("new-message", (data: MessageWithFiles) => {
        setChatData((prev) => [...prev, data]);
        setShouldAutoScroll(true);
      });

      return () => {
        pusherClient.unbind_all();
        pusherClient.unsubscribe(channelName);
      };
    }
  }, [user, receiverId]);

  return (
    <div
      ref={scrollContainerRef}
      className="px-4 w-full h-[calc(100vh-1rem-72.8px-64.8px)] overflow-y-auto no-scrollbar"
    >
      {hasMore && (
        <div className="flex justify-center py-4">
          <Button
            onClick={loadMoreMessages}
            disabled={isLoadingMore}
            variant="ghost"
            size="sm"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load more messages"
            )}
          </Button>
        </div>
      )}

      <div ref={chatContainerRef} className="flex flex-col gap-4 py-4">
        {chatData.map((chat, index) => {
          const prevChat = chatData[index - 1];
          const showDivider =
            index === 0 ||
            !isSameDay(new Date(chat.timestamp), new Date(prevChat?.timestamp));

          return (
            <Fragment key={`${chat.id}-${index}`}>
              {showDivider && (
                <DateDivider
                  date={format(new Date(chat.timestamp), "eeee, MMMM d, yyyy")}
                />
              )}
              <ChatBubble {...chat} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
