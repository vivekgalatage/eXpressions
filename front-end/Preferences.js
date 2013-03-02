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
 *
 * The views and conclusions contained in the software and documentation are those
 * of the authors and should not be interpreted as representing official policies,
 * either expressed or implied, of the FreeBSD Project.
 */

namespace("expr.config");

expr.config.PreferencesClass = function()
{
    expr.lang.Object.call(this);

    this.Events = {
        SettingChanged: "SettingChanged",
        SettingDeleted: "SettingDeleted",
        Cleared: "Cleared"
    }

    this._loadConfiguration("config.json");
}

expr.config.PreferencesClass.prototype = {
    __proto__: expr.lang.Object.prototype,

    createSetting: function(key, defaultValue, readOnly)
    {
        if (!this._preferences)
            this._preferences = [];

        var setting = new expr.config.Setting(key, defaultValue, readOnly);
        setting.addEventListener(expr.config.Setting.Events.SettingChanged, this._dispatchEvent.bind(this));
        setting.addEventListener(expr.config.Setting.Events.SettingDeleted, this._dispatchEvent.bind(this));

        this._preferences.push(setting);
        return setting;
    },

    clear: function()
    {
        for (var i = 0; i < this._preferences.length; ++i)
            this._preferences[i].remove();

        function f()
        {
            this._dispatchEvent({ name: expr.config.Preferences.Events.Cleared });
        }
        setTimeout(f.bind(this), 0);
    },

    _dispatchEvent: function(event)
    {
        switch (event.name) {
        case expr.config.Setting.Events.SettingDeleted:
            delete this[event.data.name];
            break;
        }
        this.dispatchEventToListeners(event.name, event.data);
    },

    _loadConfiguration: function(configFile)
    {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", configFile, false);
        xhr.send();
        var configPreferences = JSON.parse(xhr.responseText).preferences;
        for (var i = 0; i < configPreferences.length; ++i) {
            var config = configPreferences[i];
            this[config.name] = this.createSetting(config.name, config.value, config.readOnly);
        }
    }
}

expr.config.Setting = function(name, value, readOnly)
{
    expr.lang.Object.call(this);

    this._name = name;
    this._defaultValue = value;
    this._readOnly = !!readOnly;
}

expr.config.Setting.Events = {
    SettingChanged: "SettingChanged",
    SettingDeleted: "SettingDeleted"
}

expr.config.Setting.prototype = {
    __proto__: expr.lang.Object.prototype,

    get name()
    {
        return this._name;
    },

    get: function()
    {
        if (typeof this._value !== "undefined")
            return this._value;

        this._value = this._defaultValue;
        if (window.localStorage != null && this._name in window.localStorage) {
            try {
                this._value = JSON.parse(window.localStorage[this._name]);
            } catch(e) {
                window.localStorage.removeItem(this._name);
            }
        }
        return this._value;
    },

    set: function(value)
    {
        if (this._readOnly) {
            console.error("Trying to modify READONLY setting: " + this._name);
            return;
        }

        var oldValue = this._value;
        this._value = value;
        if (window.localStorage != null) {
            try {
                window.localStorage[this._name] = JSON.stringify(value);
            } catch(e) {
                console.error("Error saving setting with name:" + this._name);
            }
        }
        this.dispatchEventToListeners(expr.config.Setting.Events.SettingChanged, { name: this._name, newValue: this._value, oldValue: oldValue } );
    },

    remove: function()
    {
        if (this._readOnly) {
            console.error("Trying to remove READONLY setting: " + this._name);
            return;
        }

        if (window.localStorage != null) {
            try {
                window.localStorage.removeItem(this._name);
            } catch(e) {
                console.error("Error removing setting with name:" + this._name);
            }
        }
        delete this._name;
        delete this._value;
        delete this._defaultValue;
        this.dispatchEventToListeners(expr.config.Setting.Events.SettingDeleted, { name: this._name } );
    }
}

expr.config.Preferences = new expr.config.PreferencesClass();
