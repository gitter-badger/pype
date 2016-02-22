<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use jacmoe\mdpages\components\Nav;
use yii\widgets\Breadcrumbs;
use app\components\Pype;
$theme = $this->theme;
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= Html::encode($this->title) ?></title>
    <?= Html::cssFile($theme->getUrl('css/site.css')) ?>
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>

<div class="wrap">
    <header>
        <div class="top-bar">
            <div class="row">
                <div class="top-bar-left">
                    <ul class="menu">
                        <li class="menu-text">
                            <a href="<?= Yii::$app->homeUrl ?>">Pype</a>
                        </li>
                    </ul>
                </div>
                <div class="top-bar-right">
                    <?php
                    $module = Yii::$app->controller->module ? Yii::$app->controller->module->id : null;
                    echo Nav::widget([
                        'options' => ['class' => 'menu'],
                        'items' => [
                            ['label' => 'Home', 'url' => yii\helpers\Url::to(array('page/view', 'id' => 'index'))],
                        ],
                    ]);
                    ?>
                </div>
            </div>
        </div>
    </header>
    <div class="row content">
        <?= $content ?>
    </div>
</div>
<footer class="footer">
    <div class="row">
        <p class="pull-left">&copy; The Pype Team <?= date('Y') ?></p>

        <p class="pull-right"><?= Pype::powered(true, 'black') ?></p>
    </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>