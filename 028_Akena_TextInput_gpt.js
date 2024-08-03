/*:
 * @plugindesc 사용자가 문자열을 입력할 수 있는 기능을 추가합니다.
 * @author 아케나
 *
 * @help
 * 이 플러그인은 게임 플레이 중에 사용자가 문자열을 입력할 수 있는 기능을 제공합니다.
 * 
 * 사용법:
 * 1. 플러그인을 플러그인 관리 메뉴에서 활성화하세요.
 * 2. 이벤트 명령에서 스크립트를 사용하여 다음과 같은 방식으로 입력 창을 띄울 수 있습니다:
 *    Akena.showInputBox("문자열을 입력하세요", "기본값");
 * 
 * 사용자가 입력한 값은 Akena.lastInput 변수에 저장됩니다.
 * 
 * 예제:
 *   Akena.showInputBox("이름을 입력하세요", "기본 이름");
 *   var playerName = Akena.lastInput;
 *   console.log(playerName); // 사용자가 입력한 값을 콘솔에 출력합니다.
 */

var Akena = Akena || {};
Akena.lastInput = "";

Akena.showInputBox = function(promptMessage, defaultValue) {
    var input = window.prompt(promptMessage, defaultValue);
    if (input !== null) {
        Akena.lastInput = input;
        $gameActors.actor(1).setName(Akena.lastInput); // ID가 1인 배우의 이름을 변경합니다
    }
};

PluginManager.registerCommand('Akena_TextInput', 'show', args => {
    const promptMessage = String(args.promptMessage || '문자열을 입력하세요');
    const defaultValue = String(args.defaultValue || '');
    Akena.showInputBox(promptMessage, defaultValue);
});
