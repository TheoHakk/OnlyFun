
import PropTypes from 'prop-types';

export default function Connection({ setToken }) {
    return (
        <div>
            <Header></Header>
            <ConnectionTile setToken={setToken}></ConnectionTile>
        </div>
    );
}


async function loginUser(credentials) {
    console.log(credentials);
    return fetch('http://localhost:3001/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => {
            return data.json();
        })
}

function Header() {
    return (
        <div>
            <div
                className="mb-10 flex flex-col items-center justify-center w-full h-52 bg-gray-100 dark:bg-gray-900 shadow-2xl">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-5xl font-bold text-center text-gray-800 dark:text-white md:text-6xl">
                        Welcome to OnlyFun</h1>
                </div>
            </div>
        </div>
    );
}


function ConnectionTile({setToken}) {

    function submitLogin(e) {
        e.preventDefault();

        const data = new FormData(e.target);
        const token = {
            username: data.get("email"),
            password: data.get("password")
        };
        loginUser(token).then(data => {
            console.log("token connection : " + data.token);
            setToken(data.token);
        });
    }


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in
                    to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-8 shadow-xl rounded-md">
                <form className="space-y-6" onSubmit={submitLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email
                            address</label>
                        <div className="mt-2">
                            <input name="email" autoComplete="email" required
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </input>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                                    password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input name="password" type="password" autoComplete="current-password"
                                   required
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </input>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6  shadow-xl hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                            in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

ConnectionTile.propTypes = {
    setToken: PropTypes.func.isRequired
}