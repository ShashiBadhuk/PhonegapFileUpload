/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
    }
};

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
