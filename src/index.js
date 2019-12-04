document.addEventListener("DOMContentLoaded", function (event) {

    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 500 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }

    };

    var player;
    var platforms;
    var trees;
    var cursors;
    var score = 0;

    var game = new Phaser.Game(config);

    function preload() {
        this.load.image('background', 'src/assets/BG.png');
        // this.load.image('cactus','src/assets/Cactus (2).png');
        this.load.image('tile', 'src/assets/Tile (13).png');
        this.load.image('tree', 'src/assets/Tree.png');
        this.load.spritesheet('dude', 'src/assets/dude.png', { frameWidth: 32, frameHeight: 48 });

    }



    function create() {
        this.add.image(200, 300, 'background');

        platforms = this.physics.add.staticGroup();
        platforms.create(128, 700, 'tile').setScale(6, 1).refreshBody();

        platforms.create(675, 390, 'tile');
        platforms.create(128, 245, 'tile');

        player = this.physics.add.sprite(100, 450, "dude");

        player.setBounce(0.5);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        // player.anims.play('turn');
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        
        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, platforms);



    }




    function update () {

        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }

        else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else {

            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-600);
        }

    }

















});