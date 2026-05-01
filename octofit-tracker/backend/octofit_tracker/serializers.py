from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout

class UserSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'team', 'is_active']

class TeamSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'description']

class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)
    user = serializers.CharField(source='user.id', read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'user', 'activity_type', 'duration', 'date']

class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)
    team = serializers.CharField(source='team.id', read_only=True)

    class Meta:
        model = Leaderboard
        fields = ['id', 'team', 'points']

class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='pk', read_only=True)

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'difficulty']
