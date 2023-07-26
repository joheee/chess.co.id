export class SoundController {
    static PlaySoundCaptureOnce(){
        const sound = document.getElementById('sound-capture')
        sound.play()
    }
    
    static PlaySoundMoveOnce(){
        const sound = document.getElementById('sound-move-self')
        sound.play()
    }
}