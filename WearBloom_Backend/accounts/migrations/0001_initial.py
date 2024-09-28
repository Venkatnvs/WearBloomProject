# Generated by Django 4.2.16 on 2024-09-28 05:15

import django.core.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(help_text='Email address', max_length=254, unique=True)),
                ('is_completed', models.BooleanField(default=False, help_text='User profile is completed')),
                ('is_socialaccount', models.BooleanField(default=False, help_text='User is registered via social account')),
                ('role', models.CharField(choices=[('admin', 'Admin'), ('user', 'User'), ('assistant', 'Assistant')], default='user', help_text='User role', max_length=20)),
                ('phone_number', models.CharField(blank=True, help_text='Phone number', max_length=15, null=True, unique=True, validators=[django.core.validators.RegexValidator('^\\+?\\d{9,15}$')])),
                ('otp', models.CharField(blank=True, help_text='Hashed OTP', max_length=128, null=True)),
                ('otp_metadata', models.CharField(blank=True, help_text='created_at:validations_attempts:resend_attempts', max_length=50, null=True)),
                ('is_otp_verified', models.BooleanField(default=False, help_text='OTP is verified')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
    ]