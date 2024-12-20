# Generated by Django 4.2.16 on 2024-09-28 20:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wardroom', '0005_rename_faviroute_outfit_favorite'),
        ('community', '0002_exchangeitem_description_alter_exchangeitem_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='exchangeitem',
            name='lend_duration',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='exchangeitem',
            name='trade_item',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='traded_item', to='wardroom.wardrobeitem'),
        ),
    ]
