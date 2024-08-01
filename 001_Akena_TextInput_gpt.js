/*:
 * @target MZ
 * @plugindesc 사용자 입력을 통해 플레이어 캐릭터의 이름을 변경하는 플러그인입니다.
 * @author 아케나
 *
 * @help 이 플러그인은 테스트 함수 호출을 통해 사용자에게 문자열을 입력 받아
 * 플레이어 캐릭터의 이름을 변경하는 과정을 시연합니다.
 * 깃 연동 테스트
 *
 * @command test
 * @text 테스트 명령어
 * @desc 이름 변경 프로세스를 시작하기 위해 테스트 함수를 호출합니다.
 
 */

(() => {
    const pluginName = "001_Akena_TextInput_gpt";

    PluginManager.registerCommand(pluginName, "test", () => {
        SceneManager.push(Scene_NameInputCustom);
    });

    class Scene_NameInputCustom extends Scene_MenuBase {
        constructor() {
            super();
            this.initialize();
        }

        initialize() {
            super.initialize();
        }

        create() {
            super.create();
            this._actor = $gameParty.leader();
            this.createEditWindow();
            this.createInputWindow();
        }

        createEditWindow() {
            const rect = this.editWindowRect();
            this._editWindow = new Window_NameEdit(rect);
            this._editWindow.setup(this._actor, this._actor.name());
            this.addWindow(this._editWindow);
        }

        createInputWindow() {
            const rect = this.inputWindowRect();
            this._inputWindow = new Window_NameInputCustom(rect);
            this._inputWindow.setEditWindow(this._editWindow);
            this._inputWindow.setHandler('ok', this.onInputOk.bind(this));
            this._inputWindow.setHandler('cancel', this.popScene.bind(this));
            this.addWindow(this._inputWindow);
        }

        editWindowRect() {
            const ww = 600;
            const wh = this.calcWindowHeight(4, true);
            const wx = (Graphics.boxWidth - ww) / 2;
            const wy = (Graphics.boxHeight - (wh + this.inputWindowRect().height)) / 2;
            return new Rectangle(wx, wy, ww, wh);
        }

        inputWindowRect() {
            const ww = 600;
            const wh = this.calcWindowHeight(9, true);
            const wx = (Graphics.boxWidth - ww) / 2;
            const wy = this.editWindowRect().y + this.editWindowRect().height;
            return new Rectangle(wx, wy, ww, wh);
        }

        onInputOk() {
            this._actor.setName(this._editWindow.name());
            this.popScene();
        }
    }

    class Window_NameInputCustom extends Window_NameInput {
        processOk() {
            if (this.character()) {
                this.onNameAdd();
            } else if (this.isPageChange()) {
                this.onNameChange();
            } else if (this.isOk()) {
                this.onNameOk();
            } else if (this.isBack()) {
                this.onNameBack();
            }
        }

        character() {
            return this._editWindow.add() ? this.currentCharacter() : '';
        }

        onNameAdd() {
            if (this._editWindow.add()) {
                this._editWindow.add(this.character());
                this._editWindow.refresh();
                this._editWindow.activate();
            }
        }

        onNameChange() {
            this._editWindow.refresh();
            this._editWindow.activate();
        }

        onNameOk() {
            if (this._editWindow.name().length > 0) {
                this.callOkHandler();
            } else {
                this.activate();
            }
        }

        onNameBack() {
            if (this._editWindow.name().length > 0) {
                this._editWindow.back();
                this._editWindow.refresh();
                this.activate();
            } else {
                this.callCancelHandler();
            }
        }
    }
})();
