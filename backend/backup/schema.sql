--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    parent_id integer
);


ALTER TABLE public.category OWNER TO scrlzhmfijhmrf;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO scrlzhmfijhmrf;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: course_enrol; Type: TABLE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE TABLE public.course_enrol (
    user_id integer NOT NULL,
    course_id integer NOT NULL,
    enrol_at bigint NOT NULL
);


ALTER TABLE public.course_enrol OWNER TO scrlzhmfijhmrf;

--
-- Name: course_lesson; Type: TABLE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE TABLE public.course_lesson (
    id integer NOT NULL,
    course_id integer NOT NULL,
    lesson_name character varying(255) NOT NULL,
    file_name character varying(255) NOT NULL,
    file_uri character varying(255) NOT NULL,
    total_time integer NOT NULL
);


ALTER TABLE public.course_lesson OWNER TO scrlzhmfijhmrf;

--
-- Name: course_lesson_id_seq; Type: SEQUENCE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE SEQUENCE public.course_lesson_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.course_lesson_id_seq OWNER TO scrlzhmfijhmrf;

--
-- Name: course_lesson_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER SEQUENCE public.course_lesson_id_seq OWNED BY public.course_lesson.id;


--
-- Name: course_slide; Type: TABLE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE TABLE public.course_slide (
    id integer NOT NULL,
    course_id integer NOT NULL,
    slide_name character varying(255) NOT NULL,
    file_name character varying(255) NOT NULL,
    file_uri character varying(255),
    is_allow_preview boolean NOT NULL
);


ALTER TABLE public.course_slide OWNER TO scrlzhmfijhmrf;

--
-- Name: course_slide_id_seq; Type: SEQUENCE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE SEQUENCE public.course_slide_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.course_slide_id_seq OWNER TO scrlzhmfijhmrf;

--
-- Name: course_slide_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER SEQUENCE public.course_slide_id_seq OWNED BY public.course_slide.id;


--
-- Name: courser; Type: TABLE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE TABLE public.courser (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    image_avatar character varying(255) NOT NULL,
    short_description text,
    detail_description text,
    price double precision NOT NULL,
    price_promote double precision NOT NULL,
    last_update bigint NOT NULL,
    status character varying(255),
    category_id integer NOT NULL,
    teacher_id integer NOT NULL,
    view_count bigint,
    search_term character varying(255)
);


ALTER TABLE public.courser OWNER TO scrlzhmfijhmrf;

--
-- Name: courser_id_seq; Type: SEQUENCE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE SEQUENCE public.courser_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.courser_id_seq OWNER TO scrlzhmfijhmrf;

--
-- Name: courser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER SEQUENCE public.courser_id_seq OWNED BY public.courser.id;


--
-- Name: feedback; Type: TABLE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE TABLE public.feedback (
    user_id integer NOT NULL,
    course_id integer NOT NULL,
    review character varying(255),
    rate integer,
    last_update bigint NOT NULL
);


ALTER TABLE public.feedback OWNER TO scrlzhmfijhmrf;

--
-- Name: users; Type: TABLE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255),
    role character varying(255) NOT NULL,
    rf_token character varying(255),
    is_active boolean DEFAULT false NOT NULL,
    otp_code character varying(255),
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO scrlzhmfijhmrf;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO scrlzhmfijhmrf;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: watch_progress; Type: TABLE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE TABLE public.watch_progress (
    user_id integer NOT NULL,
    lesson_id integer NOT NULL,
    progress_time integer DEFAULT 0 NOT NULL,
    is_done boolean DEFAULT false NOT NULL
);


ALTER TABLE public.watch_progress OWNER TO scrlzhmfijhmrf;

--
-- Name: watchlist; Type: TABLE; Schema: public; Owner: scrlzhmfijhmrf
--

CREATE TABLE public.watchlist (
    user_id integer NOT NULL,
    course_id integer NOT NULL
);


ALTER TABLE public.watchlist OWNER TO scrlzhmfijhmrf;

--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: course_lesson id; Type: DEFAULT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.course_lesson ALTER COLUMN id SET DEFAULT nextval('public.course_lesson_id_seq'::regclass);


--
-- Name: course_slide id; Type: DEFAULT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.course_slide ALTER COLUMN id SET DEFAULT nextval('public.course_slide_id_seq'::regclass);


--
-- Name: courser id; Type: DEFAULT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.courser ALTER COLUMN id SET DEFAULT nextval('public.courser_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: scrlzhmfijhmrf
--



--
-- Data for Name: course_enrol; Type: TABLE DATA; Schema: public; Owner: scrlzhmfijhmrf
--



--
-- Data for Name: course_lesson; Type: TABLE DATA; Schema: public; Owner: scrlzhmfijhmrf
--



--
-- Data for Name: course_slide; Type: TABLE DATA; Schema: public; Owner: scrlzhmfijhmrf
--



--
-- Data for Name: courser; Type: TABLE DATA; Schema: public; Owner: scrlzhmfijhmrf
--



--
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: scrlzhmfijhmrf
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: scrlzhmfijhmrf
--

INSERT INTO public.users (id, name, email, username, password, role, rf_token, is_active, otp_code, is_deleted) VALUES (1, 'Thái Võ Xpf', 'xpf98235@zwoho.com', 'xpf98235', '$2a$10$HH4TSJmNEhQd9OfzGPqOlOX8j/FuLT9ScQcXZ/XbsDf5y1amthAca', 'STUDENT', 'nlft71ETfsfGnzmYFOpKoQPwl9wfsNhX', false, '598718', false);


--
-- Data for Name: watch_progress; Type: TABLE DATA; Schema: public; Owner: scrlzhmfijhmrf
--



--
-- Data for Name: watchlist; Type: TABLE DATA; Schema: public; Owner: scrlzhmfijhmrf
--



--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scrlzhmfijhmrf
--

SELECT pg_catalog.setval('public.category_id_seq', 1, false);


--
-- Name: course_lesson_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scrlzhmfijhmrf
--

SELECT pg_catalog.setval('public.course_lesson_id_seq', 1, false);


--
-- Name: course_slide_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scrlzhmfijhmrf
--

SELECT pg_catalog.setval('public.course_slide_id_seq', 1, false);


--
-- Name: courser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scrlzhmfijhmrf
--

SELECT pg_catalog.setval('public.courser_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: scrlzhmfijhmrf
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: category category_name_uindex; Type: CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_name_uindex UNIQUE (name);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: course_enrol course_enrol_pkey; Type: CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.course_enrol
    ADD CONSTRAINT course_enrol_pkey PRIMARY KEY (user_id, course_id);


--
-- Name: course_lesson course_lesson_pkey; Type: CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.course_lesson
    ADD CONSTRAINT course_lesson_pkey PRIMARY KEY (id);


--
-- Name: course_slide course_slide_pkey; Type: CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.course_slide
    ADD CONSTRAINT course_slide_pkey PRIMARY KEY (id);


--
-- Name: courser courser_pkey; Type: CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.courser
    ADD CONSTRAINT courser_pkey PRIMARY KEY (id);


--
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (user_id, course_id);


--
-- Name: users username; Type: CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username UNIQUE (username);


--
-- Name: users users_email_uindex; Type: CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_uindex UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: watch_progress watch_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.watch_progress
    ADD CONSTRAINT watch_progress_pkey PRIMARY KEY (user_id, lesson_id);


--
-- Name: watchlist watchlist_pkey; Type: CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT watchlist_pkey PRIMARY KEY (user_id, course_id);


--
-- Name: category category_category_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_category_id_fk FOREIGN KEY (parent_id) REFERENCES public.category(id);


--
-- Name: course_enrol course_enrol_courser_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.course_enrol
    ADD CONSTRAINT course_enrol_courser_id_fk FOREIGN KEY (course_id) REFERENCES public.courser(id);


--
-- Name: course_enrol course_enrol_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.course_enrol
    ADD CONSTRAINT course_enrol_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: course_lesson course_lesson_courser_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.course_lesson
    ADD CONSTRAINT course_lesson_courser_id_fk FOREIGN KEY (course_id) REFERENCES public.courser(id);


--
-- Name: course_slide course_slide_courser_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.course_slide
    ADD CONSTRAINT course_slide_courser_id_fk FOREIGN KEY (course_id) REFERENCES public.courser(id);


--
-- Name: courser courser_category_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.courser
    ADD CONSTRAINT courser_category_id_fk FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: courser courser_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.courser
    ADD CONSTRAINT courser_users_id_fk FOREIGN KEY (teacher_id) REFERENCES public.users(id);


--
-- Name: feedback feedback_course_enrol_user_id_course_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_course_enrol_user_id_course_id_fk FOREIGN KEY (user_id, course_id) REFERENCES public.course_enrol(user_id, course_id);


--
-- Name: watch_progress watch_progress_course_enrol_user_id_course_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.watch_progress
    ADD CONSTRAINT watch_progress_course_enrol_user_id_course_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: watch_progress watch_progress_course_lesson_course_id_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.watch_progress
    ADD CONSTRAINT watch_progress_course_lesson_course_id_id_fk FOREIGN KEY (lesson_id) REFERENCES public.course_lesson(id);


--
-- Name: watchlist watchlist_courser_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT watchlist_courser_id_fk FOREIGN KEY (course_id) REFERENCES public.courser(id);


--
-- Name: watchlist watchlist_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: scrlzhmfijhmrf
--

ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT watchlist_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO scrlzhmfijhmrf;


--
-- PostgreSQL database dump complete
--

