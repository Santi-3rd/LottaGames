# Generated by Django 4.2.4 on 2023-09-04 04:51

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('game_app', '0004_remove_game_reviews'),
        ('reviews_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reviews',
            name='review',
        ),
        migrations.AddField(
            model_name='reviews',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='reviews',
            name='game',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='game_app.game'),
        ),
        migrations.AddField(
            model_name='reviews',
            name='review_text',
            field=models.TextField(blank=True, null=True),
        ),
    ]