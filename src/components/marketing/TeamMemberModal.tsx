import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/common/Button";
import { Twitter, Linkedin, Github } from "lucide-react";

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export function TeamMemberModal({ isOpen, onClose, member }: TeamMemberModalProps) {
  if (!member) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">{member.name}</SheetTitle>
        </SheetHeader>
        
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
      </SheetContent>
    </Sheet>
  );
}