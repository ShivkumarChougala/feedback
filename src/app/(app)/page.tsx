'use client';
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
  {
    name: "Anonymous",
    username: "@anonymous",
    body: "The teaching is not clear, and it feels like the focus is always on fees and attendance rather than on actual learning.",
    img: "https://github.com/shadcn.png",
  },
  {
    name: "Anonymous",
    username: "@anonymous",
    body: "It's hard to understand the lessons, and there is too much emphasis on attendance and fees. More focus should be on teaching.",
    img: "https://github.com/shadcn.png",
  },
  {
    name: "Anonymous",
    username: "@anonymous",
    body: "The classes aren't helpful, and it seems like the only thing that matters is the fees and attendance. The teaching needs improvement.",
    img: "https://github.com/shadcn.png",
  },
  {
    name: "Anonymous",
    username: "@anonymous",
    body: "I feel the lessons are not engaging, and the focus is too much on attendance and fees. It's becoming frustrating.",
    img: "https://github.com/shadcn.png",
  },
  {
    name: "Anonymous",
    username: "@anonymous",
    body: "Teaching quality is lacking. It feels like the only concern is fees and attendance rather than helping us learn properly.",
    img: "https://github.com/shadcn.png",
  },
  {
    name: "Anonymous",
    username: "@anonymous",
    body: "I am not satisfied with the teaching style. The emphasis on fees and attendance seems to overshadow actual learning.",
    img: "https://github.com/shadcn.png",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 py-12 text-white bg-neutral-950 md:px-24">
        <section className="mb-8 text-center md:mb-12">
          <h1 className="text-xl font-bold md:text-4xl">
          Unhappy with the Class? Let the Truth Be Heard—Anonymously.
          </h1>
          <p className="mt-3 text-base md:mt-4 md:text-lg">
          No judgment. No backlash. Just the real feedback.
          </p>
        </section>

        {/* Marquee for Reviews */}
        <div className="relative w-full my-20 overflow-hidden">
          
          
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-white bg-neutral-950 md:p-6">
        © 2024 Anonymous cachè. All rights reserved.
      </footer>
    </>
  );
}
