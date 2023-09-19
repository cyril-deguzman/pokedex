import { Pokecard } from "@/components/pokecard";

export default function Home() {
  const test = [0, 0, 0, 0];

  return (
    <section className="flex flex-wrap gap-8 py-8 md:py-10 items-center justify-center">
      {test.map((i) => {
        return <Pokecard></Pokecard>;
      })}
    </section>
  );
}
