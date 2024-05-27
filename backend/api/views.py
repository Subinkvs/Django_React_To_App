from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all()
    serializers = NoteSerializer(notes, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getNote(request, pk):
    param = request.GET.get('id')
    notes = Note.objects.get(id=pk)
    serializers = NoteSerializer(notes, many=False)
    return Response(serializers.data)

@api_view(['POST'])
def  createNote(request):
    data = request.data
    notes = Note.objects.create(
        body = data['body']
    )
    serializers = NoteSerializer(notes, many=False)
    return Response(serializers.data)

@api_view(['PUT'])
def updateNote(request, pk):
    data = request.data
    notes = Note.objects.get(id=pk)
    serializers = NoteSerializer(instance=notes, data=data)  
    
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data)
    
@api_view(['DELETE'])
def deleteNote(request, pk):
    notes = Note.objects.get(id=pk)
    notes.delete()
    return Response("Note is deleted")

    
    
    