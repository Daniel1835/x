import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";

interface SocialMedia {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
}

interface SocialMediaLinksProps {
  socialMedia?: SocialMedia;
}

export function SocialMediaLinks({ socialMedia }: SocialMediaLinksProps) {
  if (!socialMedia || (!(socialMedia.instagram) && !(socialMedia.facebook) && !(socialMedia.tiktok))) {
    return null;
  }

  const socials = [
    {
      name: "Instagram",
      value: socialMedia.instagram,
      icon: SiInstagram,
      url: (handle: string) => `https://instagram.com/${handle}`,
      color: "text-pink-500 hover:text-pink-600",
    },
    {
      name: "Facebook",
      value: socialMedia.facebook,
      icon: SiFacebook,
      url: (handle: string) => `https://facebook.com/${encodeURIComponent(handle)}`,
      color: "text-blue-600 hover:text-blue-700",
    },
    {
      name: "TikTok",
      value: socialMedia.tiktok,
      icon: SiTiktok,
      url: (handle: string) => `https://tiktok.com/@${handle.replace("@", "")}`,
      color: "text-black dark:text-white hover:opacity-75",
    },
  ];

  const activeSocials = socials.filter((s) => s.value);

  if (activeSocials.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-primary" />
          Ikuti di Media Sosial
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {activeSocials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url(social.value)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-social-${social.name.toLowerCase()}`}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Icon className={`h-4 w-4 ${social.color}`} />
                  {social.name}
                </Button>
              </a>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
