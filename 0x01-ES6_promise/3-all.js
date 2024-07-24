import { uploadPhoto, createUser } from "./utils.js"

export default function handleProfileSignup() {
    const promises = [uploadPhoto(), createUser()]
    return Promise.all(promises)
        .then((msgs) => {
            console.log(`${msgs[0].body} ${msgs[1].fistName} ${msgs[1].lastName}`);
        })
        .catch(() => console.log('Signup system offline'));
}