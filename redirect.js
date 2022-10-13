const updateServerUrl = "https://github.com/NTDV/charityradar/releases/download/latest-build/";
const queryMarker = "download";
const startIndex = window.location.href.indexOf(queryMarker);

if (startIndex > -1) {
    switch (window.location.href.substr(startIndex + queryMarker.length + 1, 1)) {
        case "1":
            downloadFile(updateServerUrl + "charity-radar.apk");
            break;
        default:
            break;
    }
}

function downloadFile(url){
    setTimeout(function() {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.substring(url.lastIndexOf('/') + 1);
        link.click();},
        2000);
}