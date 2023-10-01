import { useNavigate } from "react-router-dom";
import Default from "../components/Layout/Default";

function Home() {
  const navigate = useNavigate();

  function navigateToTeddyList() {
    navigate("/products");
  }
  return (
    <Default>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full h-full justify-center items-center gap-16">
          <div className="border-8 rounded-full">
            <img
              src="/images/urso_home.png"
              height={480}
              width={480}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-4 w-[30rem]">
            <h1 className="font-bold text-6xl text-blue-600">Let's hug!</h1>
            <h2 className="font-inter font-semibold text-xl text-gray-400">
              Abraçando sonhos, um ursinho de pelúcia de cada vez.
            </h2>
            <p className="font-inter font-normal text-base text-gray-800">
              Explore nossa coleção única de ursinhos de pelúcia, criados com
              carinho e qualidade para serem o companheiro perfeito em todas as
              aventuras. Descubra o abraço perfeito que aquece corações e cria
              memórias eternas. Bem-vindo ao nosso mundo de pelúcia, amor e
              magia!
            </p>
            <button
              onClick={navigateToTeddyList}
              className="bg-blue-600 rounded-xl p-3 text-white font-semibold hover:bg-blue-600/50"
            >
              Ver Ursinhos
            </button>
          </div>
        </div>
      </div>
    </Default>
  );
}

export default Home;
