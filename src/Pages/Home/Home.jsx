import Banner from "./Banner";
import Newsletter from "./Newsletter";
import RecentBlogs from "./RecentBlogs/RecentBlogs";
import Statistics from "./Statistics";
import TopBloger from "./TopBloger";

const Home = () => {
    return (
        <div>
            <Banner/>
            <RecentBlogs/>
            <Newsletter/>
            <TopBloger/>
            <Statistics/>
        </div>
    );
};

export default Home;