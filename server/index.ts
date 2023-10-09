import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';
import { HUD_EVENTS } from '../shared/events';
import { HUDController } from './src/controller';

Athena.systems.plugins.registerPlugin('HUD', async () => {});

Athena.player.events.on('selected-character', (player: alt.Player) => {
    alt.emitClient(player, HUD_EVENTS.OPEN_HUD);
    setTimeout(() => {
        HUDController.updateHUD(player);
    }, 1500);
});

Athena.document.character.onChange('cash', (player: alt.Player, _value: number, _oldValue: number) => {
    HUDController.updateHUD(player);
});

Athena.document.character.onChange('bank', (player: alt.Player, _value: number, _oldValue: number) => {
    HUDController.updateHUD(player);
});
