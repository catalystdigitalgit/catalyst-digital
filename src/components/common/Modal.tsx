import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/common/Button";
import { Twitter, Linkedin, Github } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'side' | 'center';
  member: {
    name: string;
    role: string;
    image: string;
    bio?: string;
    achievements?: string[];
    socialLinks?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  } | null;
}

export function Modal({ isOpen, onClose, variant = 'side', member }: ModalProps) {
  if (!member) return null;

  const content = (
    <div className="space-y-6">
      <img 
        src={member.image}
        alt={member.name}
        className="w-full aspect-[3/2] object-cover rounded-lg"
      />
      
      <div>
        <h3 className="text-xl font-medium mb-2">{member.role}</h3>
        {member.bio && (
          <p className="text-muted-foreground">{member.bio}</p>
        )}
      </div>

      {member.achievements && member.achievements.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Key Achievements</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {member.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}

      {member.socialLinks && (
        <div className="flex gap-4">
          {member.socialLinks.twitter && (
            <Button variant="ghost\" size="sm\" onClick={() => window.open(member.socialLinks?.twitter, '_blank')}>
              <Twitter className="h-5 w-5" />
            </Button>
          )}
          {member.socialLinks.linkedin && (
            <Button variant="ghost" size="sm" onClick={() => window.open(member.socialLinks?.linkedin, '_blank')}>
              <Linkedin className="h-5 w-5" />
            </Button>
          )}
          {member.socialLinks.github && (
            <Button variant="ghost" size="sm" onClick={() => window.open(member.socialLinks?.github, '_blank')}>
              <Github className="h-5 w-5" />
            </Button>
          )}
        </div>
      )}
    </div>
  );

  if (variant === 'center') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-xl">
          <ScrollArea className="max-h-[80vh]">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">{member.name}</h2>
              {content}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className={cn("w-full sm:max-w-xl")}>
        <ScrollArea className="h-full">
          <div className="pr-6">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-2xl font-bold">{member.name}</SheetTitle>
            </SheetHeader>
            {content}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}