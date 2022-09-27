FROM ghcr.io/railwayapp/nixpacks:debian-1663632552

ENTRYPOINT ["/bin/bash", "-l", "-c"]
WORKDIR /app/



# setup phase
COPY .nixpacks/setup.nix .nixpacks/setup.nix
RUN nix-env -if .nixpacks/setup.nix && nix-collect-garbage -d

# load variables
ARG NIXPACKS_METADATA PYTHONUNBUFFERED
ENV NIXPACKS_METADATA=$NIXPACKS_METADATA PYTHONUNBUFFERED=$PYTHONUNBUFFERED

# install phase
ENV PATH /opt/venv/bin:$PATH
RUN printf '\nPATH=/opt/venv/bin:$PATH' >> /root/.profile
COPY . /app/
RUN --mount=type=cache,id=EMJcazVUYTI-/root/cache/pip,target=/root/.cache/pip python -m venv /opt/venv && . /opt/venv/bin/activate && pip install -r requirements.txt



# start
CMD ["python manage.py migrate && gunicorn backend.wsgi -b :8000"]

