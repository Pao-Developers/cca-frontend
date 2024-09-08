/*
 * Copyright (c) 2024 Runxi Yu <https://runxiyu.org>
 * SPDX-License-Identifier: BSD-2-Clause
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 * 
 *     1. Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 * 
 *     2. Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var connect = function(socket, callback) {
	var _handle = event => {
		let msg = new String(event?.data)
		let mar = msg.split(" ")
		for (let i = 0; i < mar.length; i++) {
			if (mar[i].startsWith(":")) {
				mar[i] = mar[i].substring(1) + " " + mar.slice(i + 1).join(" ")
				mar.splice(i + 1)
				break
			}
		}
		switch (mar[0]) {
			case "A": // authenticated
				socket.send("A") // confirm authenticated
			case "U": // unauthenticated
				alert(`Your session is broken or has expired. You are unauthenticated and the server will reject your commands.`)
			default:
				alert(`Invalid command ${mar[0]} received from socket. Something is wrong.`)
		}
	}
	socket.addEventListener("message", _handle)
	// TODO: Authenticate or something?
	socket.send("BLOOP")
}

const socket = new WebSocket("ws://localhost:5555/ws")
socket.addEventListener("open", function() {
	connect(socket, function() {})
})



