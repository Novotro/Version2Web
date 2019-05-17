$( document ).ready(function() {
  // console.log( "ready!" );
  // Variables que controlaran el tamaño del canvas, por defecto stara en hd
  var heightGame = window.screen.height *0.675;
  var widthGame = window.screen.width ;
  console.log(window.screen.width + " tamaño ");
  // Control de tamaño
   // switch(window.screen.width){
   //   case 720:
   //   console.log(window.screen.width + " tamaño ");
   //       widthGame = 720;
   //     break;
   //    case 1080:
   //    console.log(window.screen.width + " tamaño ");
   //
   //        widthGame = 570 ;
   //      break;
   //    case 1920:
   //    console.log(window.screen.width + " tamaño ");
   //
   //        widthGame = 1920;
   //      break;



  inicializar();



  function inicializar(){



    $("input").keyup(function(event){
        if(event.keyCode == 32){
            $(":focus").val($(":focus").val()+' ');
        }
    });

    $("textarea").keyup(function(event){
        if(event.keyCode == 32){
            $("textarea").val($("textarea").val()+' ');
        }
    });

    $("#botonAbout").click(function(){
      $(".modal").modal("hide");
      $("#modalAbout").modal("show");
    });

    $("#botonCono").click(function(){
      $(".modal").modal("hide");
      $("#modalCono").modal("show");
    });

    $("#botonContact").click(function(){
      $(".modal").modal("hide");
      $("#modalContact").modal("show");
    });
  }


  //Tiene que estar cargado el document primero
  var ground;
  var trees;
  var blockEx;
  var platforms;
  var bgmusic;
  var tiles;
  var jump;
  var house1;
  var button;
  var musicon;
  var musicoff;



  var config = {
    type: Phaser.AUTO,
    width: widthGame,
    height: heightGame,
    parent: 'divGame',
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

 // //Control de tamaño de ventana
 //  if(window.screen.height<1080){
 //    config.height= window.screen.height/1.5;
 //  }else{
 //    config.height= 800;
 //  }
 //
 //  if(window.screen.height<=576) {
 //      config.height= 490;
 //  }
 //
 //  //Si el dispositvo es un telefono movil
 //
 //  if(window.screen.width<=500){
 //      $('#divGame').hide();
 //  }

  var game = new Phaser.Game(config);


  function preload (){
    //Fondo del juego
    this.load.image('fondo', './assets/gfx/fondo.png');
    //Suelo
    this.load.image('ground', './assets/gfx/ground.png');
    //Plataformas
    this.load.image('platform', './assets/gfx/platform.png');
    //Jugador
    this.load.spritesheet('catIdle',  './assets/gfx/spritesheetIdle.png',  { frameWidth: 60, frameHeight: 80 });
    this.load.spritesheet('catWalk',  './assets/gfx/spritesheetWalk.png',  { frameWidth: 60, frameHeight: 80 });
    this.load.spritesheet('catJump',  './assets/gfx/spritesheetJump.png',  { frameWidth: 59, frameHeight: 80 ,endFrame: 4});
    this.load.spritesheet('catRun',  './assets/gfx/spritesheetRun.png',  { frameWidth: 59, frameHeight: 80,endFrame: 7});
    //Arboles
    this.load.image('tree', './assets/gfx/tree.png');
    //Bloque Exclamacion
    this.load.image('blocEx', './assets/gfx/bloqueEx.png');
    //Sonidos
    this.load.audio('jump', './assets/sound/jump.ogg');
    this.load.audio('bgmusic', './assets/sound/bgmusic.ogg');
    //Casa Gato
    this.load.image('house1', './assets/gfx/house1.png');
    //Botones de musica
    this.load.image('musicon', './assets/gfx/musicon.png');
    this.load.image('musicoff', './assets/gfx/musicoff.png');
    //tiles de bloques
    this.load.spritesheet('tiles',  './assets/gfx/tiles.png',  { frameWidth: 70, frameHeight: 70 });


  }

  function create (){


    // this.cameras.main.setBounds(0, -1500, 1920, 1080); // Radio de la camara
    // this.physics.world.setBounds(0, 0, 1920, 1080); // Zona fisica del mundo
    //La camara sigue al jugador
    // this.cameras.main.startFollow(player);


    //Musica de fondo
    bgmusic = this.sound.add('bgmusic', {volume: 0.1, loop: true});//musica de fondo en bucle
    bgmusic.play();
    //Añado el fondo a la posicion 0 , 0
    this.add.image(0, 0, 'fondo').setOrigin(0, 0);
    //Suelo
    ground = this.physics.add.staticGroup();

    ground.create(1080, 800, 'ground').setScale(3.6).refreshBody();

    //Arboles
    trees = this.physics.add.staticGroup();
    trees.create(200, 590, 'tree');
    trees.create(400, 590, 'tree');
    trees.create(600, 590, 'tree');
    trees.create(800, 590, 'tree');
    trees.create(1000, 590, 'tree');
    trees.create(1200, 590, 'tree');
    trees.create(1400, 590, 'tree');
    trees.create(1600, 590, 'tree');

    //Bloque exp
    blockEx = this.physics.add.staticGroup();
    blockEx.create(480, 100, 'blocEx').setScale(2).refreshBody();
    blockEx.create(1750, 100, 'blocEx').setScale(2).refreshBody();
    blockEx.create(1800, 478, 'blocEx').setScale(2).refreshBody();

    //Plataformas
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 300, 'platform').refreshBody();
    platforms.create(450, 580, 'platform').refreshBody();
    platforms.create(700, 490, 'platform').refreshBody();
    platforms.create(900, 390, 'platform').refreshBody();
    platforms.create(1200, 290, 'platform').refreshBody();
    platforms.create(1820, 290, 'platform').refreshBody();
    //Casas
    // house1 = this.physics.add.staticGroup();
    // house1.create(1800, 578, 'house1').setScale(0.6);
    //tiles
    tiles = this.physics.add.staticGroup();
    tiles.create(650, 350, 'tiles', 13).setScale(0.6).refreshBody();
    tiles.create(650, 350, 'tiles', 13).setScale(0.6).refreshBody();
    tiles.create(1420, 290, 'tiles', 13).setScale(0.6).refreshBody();
    tiles.create(1620, 290, 'tiles', 13).setScale(0.6).refreshBody();


    //Botones musica
    musicon = this.add.image(1870, 10, 'musicon').setOrigin(0, 0).setScale(0.08).setInteractive();
    //musicoff = this.add.image(1870, 10, 'musicoff').setOrigin(0, 0).setScale(0.08).setInteractive();
    musicon.on('pointerdown', function () {
      // alert("hola");
      if(bgmusic.isPlaying){
        // alert("prueba1");
        musicon.setTexture("musicoff");
        bgmusic.pause();
      }else{
        // alert("prueba2");
        musicon.setTexture("musicon");
        bgmusic.resume();
      }
    });

    //Funcion on mouseOver
    this.input.on('pointerover', function (event, gameObjects) {
      if(gameObjects[0].x == 480 && gameObjects[0].y == 100){
        console.log(game);
      }
    });

    //Jugador
    player = this.physics.add.sprite(100, 630, 'catIdle').setScale(0.93);
    //Añado un pequeño rebote al jugador cuando cae
    player.setBounce(0.05);
    //Evito que el jugador caiga por los bordes
    player.setCollideWorldBounds(true);
    //Añado gravedad al jugador
    player.body.setGravityY(300)

    //Añado propiedad de colision
    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, blockEx, hitBox, null, this); //Añado evento a la colision
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, tiles);

    //Animaciones
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('catWalk', { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('catIdle', { start: 0, end: 9 }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: 'jump',
      frames:  this.anims.generateFrameNumbers('catJump', { start: 2, end: 4 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('catWalk', { start: 0, end: 9 }),
      frameRate:10,
      repeat: -1
    });
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('catRun', { start: 0, end: 7 }),
      frameRate:10,
      repeat: -1
    });

    //Camara
    if(window.screen.height < 1080){
      console.log(window.screen.height);
      this.cameras.main.setBounds(player.x-100, 0, window.screen.width * 1.26 , window.screen.height);
      this.physics.world.setBounds(0, 0, 1920 , 800);
      this.cameras.main.startFollow(player);
    }
  }

  var temporizador = 0;
  function update (){
    var cursors = this.input.keyboard.createCursorKeys();
    var  keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    //Movimiento horizontal del personaje

    if (cursors.left.isDown)
    {
      if(keyZ.isDown){
        player.setVelocityX(-290);
        player.anims.play('run', true);
      }else{
        player.setVelocityX(-160);
        player.anims.play('left', true);
      }

      player.flipX = true;
    }
    else if (cursors.right.isDown)
    {
      if(keyZ.isDown){
        player.setVelocityX(290);
        player.anims.play('run', true);
      }else{
        player.setVelocityX(160);
        player.anims.play('right', true);
      }

      player.flipX = false;
    }
    else
    {
      player.setVelocityX(0);
      player.anims.play('idle',true);
    }


    //Si el jugador esta en el suelo y se pulsa la flecha de arriba
    if (cursors.up.isDown && player.body.touching.down && temporizador < this.time.now )    {
      temporizador = this.time.now +500;
      this.sound.play('jump', {volume: 0.1});//Sonido de salto
      player.setVelocityY(-380);
    }else if(!player.body.touching.down){
      //Si el jugador esta en el aire..
      player.anims.play('jump');
    }




  }

  function hitBox (player, blockEx)
  {
    $(".modal").modal("hide");
    if(blockEx.x== 480 && blockEx.y== 100 ){
      $("#modalAbout").modal("show");
    }
    if(blockEx.x== 1750 && blockEx.y== 100 ){
      $("#modalCono").modal("show");
    }
    if(blockEx.x== 1800 && blockEx.y== 478 ){
      $("#modalContact").modal("show");
    }
    return false;
  }

  function over(item) {
    alert();
  }
  function out(item) {
    alert();
  }






});
