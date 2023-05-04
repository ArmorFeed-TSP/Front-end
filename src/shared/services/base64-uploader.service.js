export class Base64Manager {
    constructor() {}
    async upload(event, dataHandler) {
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob());
        reader.readAsDataURL(blob)
        reader.onloadend = function () {
            dataHandler.data = reader.result;
            console.log(dataHandler.data);
        };
    }
}