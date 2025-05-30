import { Modal } from "@/components/common/Modal";
import { useTeamMemberModal } from "@/hooks/use-team-member-modal";

export function ModalProvider() {
  const { isOpen, member, closeModal } = useTeamMemberModal();

  return (
    <Modal 
      isOpen={isOpen}
      onClose={closeModal}
      member={member}
      variant="side"
    />
  );
}