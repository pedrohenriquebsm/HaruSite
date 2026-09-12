import Image from "next/image";
import Header from "./_components/header/header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <Image
          src="/logos/logo-light.png"
          alt="Logo da Haru, sendo um desenho minimalista de uma silhueta de um cavalo"
          width={587}
          height={695}
          loading="eager"
          className="w-auto h-auto"
        />
      </div>
    </>
  );
}
