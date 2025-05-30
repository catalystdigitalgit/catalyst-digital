import { cn } from '@/lib/utils';
import { useTeamMemberModal } from '@/hooks/use-team-member-modal';

interface TeamMemberCardProps {
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
  className?: string;
}

export function TeamMemberCard({
  name,
  role,
  image,
  bio,
  achievements,
  socialLinks,
  className
}: TeamMemberCardProps) {
  const { openModal } = useTeamMemberModal();

  const handleClick = () => {
    openModal({
      name,
      role,
      image,
      bio,
      achievements,
      socialLinks
    });
  };

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "bg-card rounded-lg overflow-hidden shadow-sm border",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      <img 
        src={image}
        alt={name}
        className="w-full aspect-[3/2] object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-medium">{name}</h3>
        <p className="text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}