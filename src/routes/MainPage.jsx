import '../App.css';




function MainPage() {
    return (
        <div>
            <Header></Header>
            <VideoGameCards></VideoGameCards>
        </div>
    );
}


function VideoGameCards(props) {
    return null;
}

function Header() {
    return(
        <div className="mb-80 flex flex-col items-center justify-center w-full h-52 bg-gray-100 dark:bg-gray-900 shadow-2xl">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold text-center text-gray-800 dark:text-white md:text-6xl">Welcome to OnlyFun</h1>
                <p className="mt-2 text-center text-gray-600 dark:text-gray-400 md:text-lg">The best place to find the best games</p>
            </div>
        </div>
    );
}

function VideoGameCard(props){

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={props.source} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
            </div>
        </div>
    );

}


export default MainPage;