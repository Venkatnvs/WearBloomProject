# Generated by Django 4.2.16 on 2024-09-28 14:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wardroom', '0003_remove_wardrobeitem_season_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='outfit',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
