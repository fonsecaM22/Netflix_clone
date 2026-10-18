
import Header from "../components/Header";
import Banner from "../components/Banner";
import requests from "@/utils/requests";
import Row from "@/components/Row";
import LoadingScreen from "@/components/LoadingScreen";
import ModalWrapper from "@/components/ModalWrapper";

async function Home() {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return (
    <div className="relative h-screen netflix-gradient lg:h-[140vh]">
      <LoadingScreen />
      <Header />

      <main className="relative pb-24 lg:space-y-24">
        <Banner netflixOriginals={netflixOriginals.results} />

        <section className="pl-4 md:space-y-10 lg:pl-10">
          <Row title="Trending Now" movies={trendingNow.results} />
          <Row title="Top Rated" movies={topRated.results} />
          <Row title="Action Movies" movies={actionMovies.results} />
          <Row title="Comedy Movies" movies={comedyMovies.results} />
          <Row title="Horror Movies" movies={horrorMovies.results} />
          <Row title="Romance Movies" movies={romanceMovies.results} />
          <Row title="Documentaries" movies={documentaries.results} />
        </section>
      </main>

      <ModalWrapper />
    </div>
  );
}

export default Home;
