PhonegapFileUpload
==================

<div class="pm-button"><a href="https://www.payumoney.com/paybypayumoney/#/A1F3AA31B209A89321AF96C8A034609D"><img src="https://www.payumoney.com//media/images/payby_payumoney/buttons/111.png" /></a></div>

<a href='https://pledgie.com/campaigns/28760'><img alt='Click here to lend your support to: Donate and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/28760.png?skin_name=chrome' border='0' ></a>

Uploading Image from Phonegap Mobile App to PHP backend

Step 1 : Create Phonegap Project
`sudo cordova create PhonegapFileUpload com.shashibadhuk.phonegapfileupload PhonegapFileUpload`

Step 2 : Add iOS and Android Platform to Phonegap Project
`sudo cordova platform add ios`
`sudo cordova platform add android`
 
Step 3 : Add required plugins to Phonegap Project
`sudo cordova plugin add org.apache.cordova.camera`
`sudo cordova plugin add org.apache.cordova.media-capture` 
`sudo cordova plugin add org.apache.cordova.file`
`sudo cordova plugin add org.apache.cordova.file-transfer`
`sudo cordova plugin add org.apache.cordova.console`

Step 4 : Create an Image Field inside html file 
```
<div class="app">
    <h1>File Upload - Shashi Badhuk</h1>
    <div id="main">
        <h3>Uploading Image from Phonegap Mobile App to PHP backend</h3>
        <div id="server-div">
            Server URL : <input type="text" name="server" id="server" value=""/>
        </div>
        <div id="image-upload" onClick="uploadImage()">
            <img id="pimage" src="img/profile.png" width="100px" height="100px" />
        </div>
        <div id="picture_msg">
            Tap on Image to change and upload
        </div>
    </div>
</div>
```
 
Step 5 : Create Method for File Upload (File API Implementation)
```
function uploadImage() {
    document.getElementById('picture_msg').innerHTML = "";
    // Get URI of picture to upload
    navigator.camera.getPicture(
        function(uri) {
            try {
                // Pick image from div
                var img = document.getElementById('pimage');
                img.style.visibility = "visible";
                img.style.display = "block";
                var imageURI = uri;
                if (!imageURI || (img.style.display == "none")) {
                    document.getElementById('picture_msg').innerHTML = "Tap on picture to select image from gallery.";
                    return;
                }
                // Verify server has been entered
                server = document.getElementById('server').value;
                console.log("Server "+server);
                if (server) {
                    // Specify transfer options
                    var options = new FileUploadOptions();
                    options.fileKey="file";
                    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
                    options.mimeType="image/jpeg";
                    options.chunkedMode = false;
                               
                    // Transfer picture to server
                    var ft = new FileTransfer();
                    ft.upload(imageURI, server, function(r) {
                        document.getElementById('picture_msg').innerHTML = "Upload successful: "+r.bytesSent+" bytes uploaded.";
                        img.src = uri;
                        img.width = 100;
                        img.height = 100;
                    },
                    function(error) {
                        document.getElementById('picture_msg').innerHTML = "Upload failed: Code = "+error.code;
                    }, options);
                }
                else {
                    document.getElementById('picture_msg').innerHTML = "Server Not Found";
                }
            }
            catch(exce) {
                alert(exce);
            }
        },
        function(e) {
            console.log("Error getting picture: " + e);
            document.getElementById('picture_msg').innerHTML = "No Image Found";
        },
        {
            quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
    );
}  
``` 
 
Step 6 : Create PHP Script on server side to save file (Server Side Implementation)
```
<?php 
 // Directory where uploaded images are saved
 $dirname = "uploads/"; 
 // If uploading file
 if ($_FILES) {
    print_r($_FILES);
    mkdir ($dirname, 0777, true);
    move_uploaded_file($_FILES["file"]["tmp_name"],$dirname."/".$_FILES["file"]["name"]);
 }
?>
```
