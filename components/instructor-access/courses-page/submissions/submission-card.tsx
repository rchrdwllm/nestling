import { getFile } from "@/lib/file";
import { getUserById } from "@/lib/user";
import { Submission } from "@/types";
import SubmissionDialog from "./submission-dialog";

const SubmissionCard = async ({ userId, fileId }: Submission) => {
  const { success: user, error: userError } = await getUserById(userId);
  const { success: file, error: fileError } = await getFile(fileId);

  if (userError || fileError) {
    return <div>{userError || fileError}</div>;
  }

  if (!user || !file) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      <SubmissionDialog user={user} fileUrl={file.secure_url} />
    </article>
  );
};

export default SubmissionCard;
