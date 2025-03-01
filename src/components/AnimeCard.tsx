import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import type { Anime } from "@/types";
const AnimeCard = ({ anime }: { anime: Anime }) => {
  return (
    <Card>
      <CardHeader className="w-40 max-w-40">
        <CardTitle>{anime.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
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
        <div className="flex flex-col">
          <span>Score : {anime.score}</span>
          <span>Rank : {anime.rank}</span>
          <span>Members: {anime.members}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimeCard;
