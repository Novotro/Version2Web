$( document ).ready(function() {
  // console.log( "ready!" );
  // Variables que controlaran el tamaño del canvas, por defecto stara en hd
  var heightGame = window.screen.height *0.675;
  var widthGame = window.screen.width ;
  console.log(window.screen.width + " tamaño ");


  var config = {
    type: Phaser.CANVAS,
    width: widthGame,
    height: heightGame,
    resolution: 1,
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

  var game = new Phaser.Game(config);

  inicializar();

  function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;

    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }

}



  function inicializar(){

    $("divGame").css("max-height", "maxHeight");


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


    $("#modalHome").modal("show");


    $("#botonHome").click(function(){
      $(".modal").modal("hide");
      $("#modalHome").modal("show");
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

    $("#botonProj").click(function(){
      $("#modalProj").modal("show");
    });

    $("#help img").click(function(){
      $("#modalIns").modal("show");
    });

    $( ".modal" ).on('shown.bs.modal', function(){
      // Si se abre el modal se pausa el juego
      game.scene.pause("default");
    });

    $( ".modal" ).on('hidden.bs.modal', function(){
      // Si se abre el modal se pausa el juego
      game.scene.resume("default");
    });
  }

  //Tiene que estar cargado el document primero
  var ground;
  var trees;
  var blockEx;
  var platforms;
  var platformsMovement;
  var bgmusic;
  var tiles;
  var jump;
  var house1;
  var button;
  var musicon;
  var musicoff;
  var text;
  var soundStat; //Variable para determinar si el sonido esta on/off


  //Llamada a la funcion para que se adapte al tamaño automaticamente
  resize();
  window.addEventListener("resize", resize, false);

  function preload (){


    //Fondo del juego
    this.load.image('fondo', './assets/gfx/fondo.png');
    //Suelo
    this.load.image('ground', './assets/gfx/ground.png');
    //Plataformas
    this.load.image('platform', './assets/gfx/platform.png');
    //Plataformas con Movimiento
    this.load.image('platformsMovement', './assets/gfx/platform.png');
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
    //tiles de bloques
    this.load.spritesheet('tiles',  './assets/gfx/tiles.png',  { frameWidth: 70, frameHeight: 70 });
    //Señal para la Plataforma
    this.load.spritesheet('signal',  './assets/gfx/signal.png',  { frameWidth: 216, frameHeight: 226 });
    //Cartel
    this.load.spritesheet('sign',  './assets/gfx/sign.png',  { frameWidth: 300, frameHeight: 400 });


  }

  function create (){
    //Musica de fondo
    bgmusic = this.sound.add('bgmusic', {volume: 0.1, loop: true});//musica de fondo en bucle
    bgmusic.play();
    soundStat= true;
    // activar o desactivar Musica
    $("#music img").click(function(){
      if(bgmusic.isPlaying){
        bgmusic.pause();
        $("#music img").attr("src","./images/musicoff.png");
        soundStat = false;
      }else{
        bgmusic.resume();
        $("#music img").attr("src","./images/musicon.png");
        soundStat = true;
      }
    });

    //Añado el fondo a la posicion 0 , 0
    this.add.image(0, 0, 'fondo').setOrigin(0, 0);
    //Suelo
    ground = this.physics.add.staticGroup();
    ground.create(540, 1100, 'ground').setScale(1).refreshBody();
     ground.create(1000, 1100, 'ground').setScale(1).refreshBody();
     ground.create(1500, 1100, 'ground').setScale(1).refreshBody();
    //Arboles
    trees = this.physics.add.staticGroup();
    trees.create(600, 985, 'tree');
    trees.create(800, 985, 'tree');
    trees.create(1000, 985, 'tree');
    trees.create(1200, 985, 'tree');
    trees.create(1400, 985, 'tree');
    trees.create(1600, 985, 'tree');
    trees.create(1800, 985, 'tree');

    //Bloque exp
    blockEx = this.physics.add.staticGroup();
    //tiles (Cajas de madera)
    tiles = this.physics.add.staticGroup();

    //Plataformas
    platforms = this.physics.add.staticGroup();

    //Cartel
    this.add.image(100, 787, 'sign').setOrigin(0, 0).setScale(0.7);


    // Zona 1(izquierda)
    platforms.create(450, 970, 'platform').refreshBody();
    platforms.create(700, 880, 'platform').refreshBody();
    platforms.create(450, 770, 'platform').refreshBody();
    platforms.create(690, 660, 'platform').refreshBody();
    platforms.create(350, 600, 'platform').refreshBody();
    platforms.create(170, 600, 'platform').refreshBody();
    blockEx.create(100, 430, 'blocEx').setScale(2).refreshBody();
    //Zona 2(parte superior derecha)
    platforms.create(950, 600, 'platform').refreshBody();

    // Aqui ira la plataforma y palanca
    // ************************************
    platformsMovement = this.physics.add.sprite(1300, 425, 'platformsMovement');
    this.add.image(1000, 520, 'signal').setOrigin(0, 0).setScale(0.3);
    this.add.text(995, 460, 'Pulsa X para \n  bajar la \n plataforma', { fontSize: '12px', fill: '#000', fontStyle: 'bold' });

    // console.log(platformsMovement);
    platformsMovement.body.allowGravity = false;// Quito la gravedad de la plataforma para que no caiga
    platformsMovement.body.immovable= true; //Evito que la plataforma se pueda mover con la colision del player

    // ************************************
    platforms.create(950, 600, 'platform').refreshBody();
    platforms.create(1800, 600, 'platform').refreshBody();
    platforms.create(1620, 600, 'platform').refreshBody();
    blockEx.create(1880, 430, 'blocEx').setScale(2).refreshBody();

    // Zona 3(parte inferior derecha)
    platforms.create(1000, 880, 'platform').refreshBody();
    tiles.create(1250, 880, 'tiles', 13).setScale(0.6).refreshBody();
    tiles.create(1400, 880, 'tiles', 13).setScale(0.6).refreshBody();
    tiles.create(1550, 880, 'tiles', 13).setScale(0.6).refreshBody();
    blockEx.create(1880, 720, 'blocEx').setScale(2).refreshBody();
    platforms.create(1800, 880, 'platform').refreshBody();


    //Funcion on mouseOver
    this.input.on('pointerover', function (event, gameObjects) {
      if(gameObjects[0].x == 580 && gameObjects[0].y == 100){
        console.log(game);
      }
    });

    //Jugador
    player = this.physics.add.sprite(100, 1030, 'catIdle').setScale(0.93);
    //Añado un pequeño rebote al jugador cuando cae
    player.setBounce(0.05);
    //Evito que el jugador caiga por los bordes
    player.setCollideWorldBounds(true);
    //Añado gravedad al jugador
    player.body.setGravityY(300);

    //Añado propiedad de colision
    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, blockEx, hitBox, null, this); //Añado evento a la colision
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, platformsMovement);
    this.physics.add.collider(player, tiles);

    console.log(blockEx);

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
      this.cameras.main.setBounds(0, 0, 1920, 1130 );
    // this.cameras.main.setZoom(1.02);
    this.physics.world.setBounds(0, 0, 1920 , 800*2);
    this.cameras.main.startFollow(player,true);



  }

  var temporizador = 0;
  function update (){
    var cursors = this.input.keyboard.createCursorKeys();
    var  keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    var  keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);




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


    // Movimiento de la plataforma
    if(keyX.isDown && player.x>=1010 && player.y<= 550){ // Si el player esta al lado de la palanca...
      console.log(platformsMovement);
      platformsMovement.setVelocityY(100);
    }

     if(keyX.isDown){ // Si el player esta al lado de la palanca...
      console.log("jugador X: "+player.x);
      console.log("jugador Y: "+player.y);
    }

    if(platformsMovement.y>=590){
      platformsMovement.setVelocityY(0);
    }


    //Si el jugador esta en el suelo y se pulsa la flecha de arriba
    if (cursors.up.isDown && player.body.touching.down && temporizador < this.time.now )    {
      temporizador = this.time.now +500;
      //Si el sonido no esta muteado
      if(soundStat){
        this.sound.play('jump', {volume: 0.1});//Sonido de salto
      }
      player.setVelocityY(-380);
    }else if(!player.body.touching.down){
      //Si el jugador esta en el aire..
      player.anims.play('jump');
    }




  }

  function hitBox (player, blockEx)
  {

    if(blockEx.x== 100 && blockEx.y== 430 && blockEx.body.touching.down == true){
      $("#modalAbout").modal("show");
    }
    if(blockEx.x== 1880 && blockEx.y== 430 && blockEx.body.touching.down == true ){
      $("#modalCono").modal("show");
    }
    if(blockEx.x== 1880 && blockEx.y== 720 && blockEx.body.touching.down == true){
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
