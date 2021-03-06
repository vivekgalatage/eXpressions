/*
 * Copyright (c) 2013, Vivek Galatage
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

namespace("expr.net");

expr.net.SessionInfo = function(hostName, port, nickName, realName)
{
    this._hostName = hostName;
    this._port = port;
    this._nickName = nickName;
    this._realName = realName;
}

expr.net.Session = function(sessionInfo)
{
    expr.base.Object.call(this);
    this._hostName = sessionInfo._hostName;
    this._port = sessionInfo._port;
    this._nickName = sessionInfo._nickName;
    this._realName = sessionInfo._realName;
}

expr.net.Session.prototype = {
    __proto__: expr.base.Object.prototype,

    get hostName()
    {
        return this._hostName;
    },

    get port()
    {
        return this._port;
    },

    get realName()
    {
        return this._realName;
    },

    get nickName()
    {
        return this._nickName;
    },
}
