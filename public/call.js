let localVideo = document.getElementById("local-video")
let remoteVideo = document.getElementById("remote-video")

localVideo.style.opacity = 0
remoteVideo.style.opacity = 0

localVideo.onplaying = () => { localVideo.style.opacity = 1 }
remoteVideo.onplaying = () => { remoteVideo.style.opacity = 1 }

let peer
function init (userId) {
    console.log("Initialising with userId:" + userId);
	peer = new Peer(userId, {
        host:  'http://timez-env.eba-e46rgjvy.us-east-2.elasticbeanstalk.com', // TODO
        port: 8080,
        path: '/peerjs',
        key: 'peerjs',
        secure: true // TODO
    })

    //peer = new Peer(userId);

    console.log(peer);

    // peerjs --port 9000 --key peerjs --path /videocall

	peer.on('open', () => {
		// CALL TO KOTLIN FUNCTION
	})

	listen()
}

let localStream
function listen() {
    peer.on('call', (call) => {

        navigator.getUserMedia({
            audio: true, 
            video: true
        }, (stream) => {
            localVideo.srcObject = stream
            localStream = stream

            call.answer(stream)
            call.on('stream', (remoteStream) => {
                remoteVideo.srcObject = remoteStream

                remoteVideo.className = "primary-video"
                localVideo.className = "secondary-video"

            })

        })
        
    })
}

function startCall(otherUserId) {
    navigator.getUserMedia({
        audio: true,
        video: true
    }, (stream) => {

        localVideo.srcObject = stream
        localStream = stream

        const call = peer.call(otherUserId, stream)
        call.on('stream', (remoteStream) => {
            remoteVideo.srcObject = remoteStream

            remoteVideo.className = "primary-video"
            localVideo.className = "secondary-video"
        })

    })
}

function toggleVideo(b){
	if (b == "true") {
		localStream.getVideoTracks()[0].enabled = true
	} else {
		localStream.getVideoTracks()[0].enabled = false
	}
}

function toggleAudio(b){
	if (b == "true") {
		localStream.getAudioTracks()[0].enabled = true
	} else {
		localStream.getAudioTracks()[0].enabled = false
	}
}










