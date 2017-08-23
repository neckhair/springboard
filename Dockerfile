FROM golang:1.9-alpine3.6 AS builder

WORKDIR /go/src/github.com/neckhair/springboard

RUN apk --no-cache add git yarn build-base

# Only copy go files to cache go build dependencies
COPY main.go ./
COPY springboard ./springboard

RUN go-wrapper download
RUN go-wrapper install

# Copy the rest of the app
COPY . ./
RUN yarn install && node_modules/.bin/webpack


FROM alpine:latest
WORKDIR /app/
COPY --from=builder /go/bin/springboard .
COPY --from=builder /go/src/github.com/neckhair/springboard/assets ./assets
COPY --from=builder /go/src/github.com/neckhair/springboard/templates ./templates
ENV GIN_MODE=release
EXPOSE 8080
CMD ["./springboard"]
