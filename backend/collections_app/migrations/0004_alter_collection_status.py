# Generated by Django 4.2.4 on 2023-08-31 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collections_app', '0003_alter_collection_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collection',
            name='status',
            field=models.CharField(choices=[('currently playing', 'Currently Playing'), ('beaten', 'Beaten'), ('completed', 'Completed'), ('dropped', 'Dropped')], default='currently playing', max_length=20),
        ),
    ]
