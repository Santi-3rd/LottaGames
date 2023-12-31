# Generated by Django 4.2.4 on 2023-08-31 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collections_app', '0002_remove_collection_beaten_remove_collection_completed_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collection',
            name='status',
            field=models.CharField(choices=[('currently_playing', 'Currently Playing'), ('beaten', 'Beaten'), ('completed', 'Completed'), ('dropped', 'Dropped')], default='currently_playing', max_length=20),
        ),
    ]
