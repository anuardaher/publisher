export default function ({ $axios, redirect }) {

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status);
        console.error('Axios Error ' + code);
        if(error.code >= 500) {
            return redirect('/error')
        }
    })

}