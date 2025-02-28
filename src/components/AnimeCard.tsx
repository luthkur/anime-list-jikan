import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const AnimeCard = ({ anime }) => {
  return (
    <Card>
      <CardHeader className="w-3xs">
        <CardTitle>{anime.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="h-[220px] w-[160px] relative">
          <Image
            src={anime.images.webp.large_image_url}
            alt={anime.title}
            sizes="100%"
            layout="fill"
            unoptimized
          />
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default AnimeCard;
