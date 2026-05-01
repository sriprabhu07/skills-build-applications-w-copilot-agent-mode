from django.core.management.base import BaseCommand
from octofit_tracker import models
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        from datetime import date
        from django.db import connection
        # Delete existing data
        for obj in models.User.objects.all():
            obj.delete()
        for obj in models.Team.objects.all():
            obj.delete()
        for obj in models.Activity.objects.all():
            obj.delete()
        for obj in models.Leaderboard.objects.all():
            obj.delete()
        for obj in models.Workout.objects.all():
            obj.delete()

        # Create Teams
        marvel = models.Team.objects.create(name='Marvel', description='Marvel superheroes')
        dc = models.Team.objects.create(name='DC', description='DC superheroes')

        # Create Users

        tony = models.User.objects.create(email='tony@stark.com', name='Tony Stark', team=marvel.name)
        steve = models.User.objects.create(email='steve@rogers.com', name='Steve Rogers', team=marvel.name)
        bruce = models.User.objects.create(email='bruce@banner.com', name='Bruce Banner', team=marvel.name)
        clark = models.User.objects.create(email='clark@kent.com', name='Clark Kent', team=dc.name)
        brucew = models.User.objects.create(email='bruce@wayne.com', name='Bruce Wayne', team=dc.name)
        diana = models.User.objects.create(email='diana@prince.com', name='Diana Prince', team=dc.name)

        # Create Activities (use only users created above)
        models.Activity.objects.create(user=tony, activity_type='run', duration=30, date=date.today())
        models.Activity.objects.create(user=steve, activity_type='cycle', duration=60, date=date.today())
        models.Activity.objects.create(user=clark, activity_type='swim', duration=45, date=date.today())

        # Create Workouts
        models.Workout.objects.create(name='Avenger HIIT', description='High intensity workout for Avengers', difficulty='Hard')
        models.Workout.objects.create(name='Justice League Strength', description='Strength workout for Justice League', difficulty='Medium')

        # Create Leaderboard (team-based)
        models.Leaderboard.objects.create(team=marvel, points=280)
        models.Leaderboard.objects.create(team=dc, points=310)

        # Ensure unique index on email for User collection
        db = connection.cursor().db_conn
        db['octofit_tracker_user'].create_index('email', unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
