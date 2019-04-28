export function responseCodeTest(response) {
    if (response.status_code === "201" || response.status_code === "200")
        console.log("%c ✔ " + response.description, 'background: #777; color: #bada55');
    else
        console.log("%c ✖ " + response.description, 'background: #da5555; color: #eee');
}