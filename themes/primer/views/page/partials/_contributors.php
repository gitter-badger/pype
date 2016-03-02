<?php
foreach($page->contributors as $contributor) {
    echo Html::a(Html::img(Yii::getAlias('@web/avatars/') . $contributor->login . '.png', array('width' => '24', 'height' => '24', 'title' => $contributor->name, 'class' => 'avatar avatar-small')), $contributor->html_url, array('target' => '_blank'));
}