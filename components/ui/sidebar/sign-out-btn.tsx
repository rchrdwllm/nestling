import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logUserActivity } from "@/server/actions/log-user-activity";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

const SignOutBtn = () => {
  const { user } = useCurrentUser();
  const { execute } = useAction(logUserActivity);

  const handleSignOut = () => {
    toast.dismiss();
    toast.loading("Signing you out...");

    signOut()
      .then(() => {
        fetch("/api/revalidate", {
          method: "POST",
          body: JSON.stringify({
            tags: ["courses", "students", "contents", "modules"],
          }),
        });

        toast.dismiss();
        toast.success("You have been signed out successfully!");
        execute({
          userId: user.id,
          type: "logout",
          details: {
            role: user.role,
          },
        });
      })
      .catch((error) => {
        toast.error(error);

        toast.dismiss();
        toast.success("Error signing you out: " + error);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="items-center h-[unset] px-2 py-[6px] font-normal justify-start flex gap-2 w-full text-primary hover:text-primary"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will log you out of your account. You will need to log
            in again to access the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignOut}>Log out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignOutBtn;
