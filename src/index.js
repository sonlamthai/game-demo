document.addEventListener("DOMContentLoaded", function (event) {

    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
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
    var cactus;
    var cursors;
    var score = 0;
    var scoreText;
    

    var game = new Phaser.Game(config);

    function preload() {
        this.load.image('background', 'src/assets/BG.png');
        this.load.image('cactu', 'src/assets/Cactus (2).png');
        this.load.image('tile', 'src/assets/Tile (13).png');
        this.load.image('tree', 'src/assets/Tree.png');
        this.load.spritesheet('dude', 'src/assets/dude.png', { frameWidth: 32, frameHeight: 48 });

    }



    function create() {
        this.add.image(200, 300, 'background');

        platforms = this.physics.add.staticGroup();
        platforms.create(128, 600, 'tile').setScale(6, 1).refreshBody();

        platforms.create(675, 400, 'tile');
        platforms.create(128, 325, 'tile');

        player = this.physics.add.sprite(100, 450, "dude");

        player.setBounce(0.5);
        player.setCollideWorldBounds(true);

        cactus = this.physics.add.group({
            key: 'cactu',
            repeat: 8,
            setXY: { x: 12, y: 0, stepX: 100 }
        });

        cactus.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.5, 0.75));

        });

        trees = this.physics.add.group();

        // cactus.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
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
        this.physics.add.collider(cactus, platforms);
        // this.physics.add.collider(trees, platforms);


        this.physics.add.overlap(player, cactus, collectCactus, null, this);
        this.physics.add.collider(player, trees, hitTrees, null, this);

        scoreText = this.add.text(320, 16, 'score: 0', { fontSize: '32px', fill: '#000' });


        click = this.input.on('poiterdown', function () {
            console.log("hello");


        })






    }




    function update () {

        // if (gameOver) {
        //     return;
        // }

        if (cursors.left.isDown) {
            player.setVelocityX(-600);

            player.anims.play('left', true);
        }

        else if (cursors.right.isDown) {
            player.setVelocityX(600);

            player.anims.play('right', true);
        }

        else if (cursors.up.isDown) {
            player.setVelocityY(-300);
        }

        else if (cursors.down.isDown) {
            player.setVelocityY(300)
        }

        else {

            player.setVelocityX(0);
            player.setVelocityY(0);
            player.anims.play('turn');
        }


    }


    function collectCactus(player, cactu) {
        cactu.disableBody(true, true);
        score += 1;
        scoreText.setText('Score: ' + score);


        if (cactus.countActive(true) === 0) {
            cactus.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var tree = trees.create(x, 16, 'tree');
            tree.setBounce(1);
            tree.setCollideWorldBounds(true);
            tree.setVelocity(Phaser.Math.Between(-200, 200), 20);


        }

    }

    function hitTrees(player, trees) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }

















});