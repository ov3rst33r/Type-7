class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    preload() {            //load all sprites
        this.load.image(
            'background',
            'assets/sprites/background.jpg'
        );
    
        this.load.image('dot1','assets/sprites/dots/dot1.png');
        this.load.image('dot2','assets/sprites/dots/dot2.png');
        this.load.image('dot3','assets/sprites/dots/dot3.png');
        this.load.image('dot4','assets/sprites/dots/dot4.png');
        this.load.image('dot5','assets/sprites/dots/dot5.png');
        this.load.image('dot6','assets/sprites/dots/dot6.png');
    };

    create() {             //paint all sprites
        this.createBackground();
        this.createDots();
        this.createLine();
        this.clickedDot = null;
    };

    createBackground() {
        this.add.sprite(0, 0, 'background').setOrigin(0, 0);
    };

    createDots() {
        this.dots = [];
        let positions = this.getDotPositions();
        Phaser.Utils.Array.Shuffle(positions);

        for (let value of config.dots) {
            for (let q = 0; q < 6; q++) {
                this.dots.push(new Dot(this, positions.pop(), value));
            }
        }

        this.input.on("gameobjectdown", this.onClickedDot, this);
    };

    onClickedDot(pointer, dot) {
        dot.click();
    }

    getDotPositions() {
        let positions = [];
        let dotTexture = this.textures.get('dot1').getSourceImage();
        let dotDiameter = dotTexture.width + 60;
        let offsetX = ((this.sys.game.config.width - dotDiameter * config.rows) / 2) + 30;
        let offsetY = (this.sys.game.config.height - dotDiameter * config.cols) / 2;
        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                positions.push({
                    x: offsetX + col * dotDiameter,
                    y: offsetY + row * dotDiameter,
                });
            }
        }
         
        return positions;
    };

    createLine() {
        let isDragging =  false;
        let lineStartPosition =  {x:0 , y:0};
        let line = this.add.line(0, 0, 0, 0, 100, 100, 0xffffff).setOrigin(-0.2, -0.2);
        line.setLineWidth(5);
        line.visible = false;

        this.input.on('pointerdown', dragStart);
        this.input.on('pointerup', dragEnd);
        this.input.on('pointermove', drag);

        function dragStart(pointer, dots){

            if(dots.length == 0)
              return;
        
            lineStartPosition.x = dots[0].x;
            lineStartPosition.y = dots[0].y;
            isDragging = true;
        
            line.x = dots[0].x;
            line.y = dots[0].y;
            line.visible = true;
        
        }
        
        function drag(pointer, gameObject){
            if(isDragging == true){
                line.setTo(0, 0, pointer.x - lineStartPosition.x, pointer.y - lineStartPosition.y);
            }
        }
        
        function dragEnd(pointer, gameObject){
            isDragging = false;
        }
    }
};
