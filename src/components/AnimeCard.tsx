import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const AnimeCard = ({ anime }) => {
  return (
    <Card>
      <CardHeader className="w-40">
        <CardTitle>{anime.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="h-[220px] w-[160px] relative">
          <Link href={`anime/${anime.mal_id}`}>
            <Image
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              sizes="100%"
              fill
              unoptimized
            />
          </Link>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default AnimeCard;
