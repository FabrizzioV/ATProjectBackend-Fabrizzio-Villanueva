PGDMP     +    -        	        |         	   ATProject    15.3    15.3 Q    p           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            q           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            r           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            s           1262    17057 	   ATProject    DATABASE     �   CREATE DATABASE "ATProject" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "ATProject";
                postgres    false            t           0    0    DATABASE "ATProject"    ACL     ,   GRANT ALL ON DATABASE "ATProject" TO fabri;
                   postgres    false    3443            �            1255    18277    getflighttickets(integer)    FUNCTION     5  CREATE FUNCTION public.getflighttickets(ticketid integer) RETURNS TABLE(seatid name, statusticketid integer, statusticket name, flightroutecode text, boardingtime time with time zone, gateid name, flightdate date, origincode name, finalcode name, userfullname text, countryoriginname text, countryfinalname text)
    LANGUAGE plpgsql
    AS $$
BEGIN
	RETURN QUERY SELECT
		ft."seatId",
		ft."statusTicketId",
		st."statusTicket",
		fr."flightRouteCode",
		fr."boardingTime",
		fr."gateId",
		fr."flightDate",
		l."airportCode" as originCode,
		l2."airportCode" as finalCode,
		CONCAT(u."userLastName",', ', u."userName") as userFullName,
		CONCAT(l."location",', ', "c"."country") as countryOriginName,
		CONCAT(l2."location",', ', "c1"."country") as countryFinalName
    FROM
        "flightTicket" ft
	LEFT JOIN "flightRoute" as fr ON fr."flightRouteId" = ft."flightRoute"
	LEFT JOIN "statusTicket" as st ON st."statusTicketId" = ft."statusTicketId"
	LEFT JOIN "location" as l ON fr."originLocation" = l."locationId"
	LEFT JOIN "location" as l2 ON fr."finalLocation" = l2."locationId"
	LEFT JOIN "country" as "c" ON l."countryId" = "c"."countryId"
	LEFT JOIN "country" as "c1" ON l2."countryId" = "c1"."countryId"
	LEFT JOIN "user" as u ON u."userId" = ft."userId"
	WHERE (@ticketId IS NULL OR ft."ticketId" = @ticketId);
END;
$$;
 9   DROP FUNCTION public.getflighttickets(ticketid integer);
       public          postgres    false            �            1259    17781    airline    TABLE     �   CREATE TABLE public.airline (
    "airlineId" integer NOT NULL,
    "airlineName" name NOT NULL,
    "airlineCode" name NOT NULL
);
    DROP TABLE public.airline;
       public         heap    postgres    false            �            1259    17908    airline_airlineId_seq    SEQUENCE     �   ALTER TABLE public.airline ALTER COLUMN "airlineId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."airline_airlineId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    17771 	   classSeat    TABLE     g   CREATE TABLE public."classSeat" (
    "classSeatId" integer NOT NULL,
    "classSeat" name NOT NULL
);
    DROP TABLE public."classSeat";
       public         heap    postgres    false            �            1259    18225    classSeat_classSeatId_seq    SEQUENCE     �   ALTER TABLE public."classSeat" ALTER COLUMN "classSeatId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."classSeat_classSeatId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    18234    country    TABLE     ]   CREATE TABLE public.country (
    "countryId" integer NOT NULL,
    country name NOT NULL
);
    DROP TABLE public.country;
       public         heap    postgres    false            �            1259    18233    country_countryId_seq    SEQUENCE     �   ALTER TABLE public.country ALTER COLUMN "countryId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."country_countryId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    237            �            1259    17732    flightRoute    TABLE     �  CREATE TABLE public."flightRoute" (
    "flightRouteId" integer NOT NULL,
    "flightRouteCode" text NOT NULL,
    "boardingTime" time with time zone NOT NULL,
    "originLocation" integer NOT NULL,
    "finalLocation" integer NOT NULL,
    "planeId" integer NOT NULL,
    "airlineId" integer NOT NULL,
    "gateId" name NOT NULL,
    "flightDate" date NOT NULL,
    price numeric
);
 !   DROP TABLE public."flightRoute";
       public         heap    postgres    false            �            1259    17958    flightRoute_flightRouteId_seq    SEQUENCE     �   ALTER TABLE public."flightRoute" ALTER COLUMN "flightRouteId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."flightRoute_flightRouteId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    17751    flightTicket    TABLE     �   CREATE TABLE public."flightTicket" (
    "ticketId" integer NOT NULL,
    "flightRoute" integer NOT NULL,
    "userId" integer NOT NULL,
    "statusTicketId" integer NOT NULL,
    "seatId" name NOT NULL
);
 "   DROP TABLE public."flightTicket";
       public         heap    postgres    false            �            1259    18227    flightTicket_ticketId_seq    SEQUENCE     �   ALTER TABLE public."flightTicket" ALTER COLUMN "ticketId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."flightTicket_ticketId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    17727 
   flightType    TABLE     j   CREATE TABLE public."flightType" (
    "flightTypeId" integer NOT NULL,
    "flightType" name NOT NULL
);
     DROP TABLE public."flightType";
       public         heap    postgres    false            �            1259    17955    flightType_flightTypeId_seq    SEQUENCE     �   ALTER TABLE public."flightType" ALTER COLUMN "flightTypeId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."flightType_flightTypeId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    17776    gate    TABLE     \   CREATE TABLE public.gate (
    "gateId" name NOT NULL,
    "statusGate" integer NOT NULL
);
    DROP TABLE public.gate;
       public         heap    postgres    false            �            1259    17722    location    TABLE     �   CREATE TABLE public.location (
    "locationId" integer NOT NULL,
    location name NOT NULL,
    "flightTypeId" integer NOT NULL,
    "countryId" integer NOT NULL,
    "airportCode" name
);
    DROP TABLE public.location;
       public         heap    postgres    false            �            1259    17956    location_locationId_seq    SEQUENCE     �   ALTER TABLE public.location ALTER COLUMN "locationId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."location_locationId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    17791    paymentMethod    TABLE     w   CREATE TABLE public."paymentMethod" (
    "paymentMethodId" integer NOT NULL,
    "paymentMethodName" name NOT NULL
);
 #   DROP TABLE public."paymentMethod";
       public         heap    postgres    false            �            1259    18226 !   paymentMethod_paymentMethodId_seq    SEQUENCE     �   ALTER TABLE public."paymentMethod" ALTER COLUMN "paymentMethodId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."paymentMethod_paymentMethodId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    17739    plane    TABLE     |   CREATE TABLE public.plane (
    "planeId" integer NOT NULL,
    "planeCode" name NOT NULL,
    "planeType" name NOT NULL
);
    DROP TABLE public.plane;
       public         heap    postgres    false            �            1259    17957    plane_planeId_seq    SEQUENCE     �   ALTER TABLE public.plane ALTER COLUMN "planeId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."plane_planeId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    17786    statusTicket    TABLE     p   CREATE TABLE public."statusTicket" (
    "statusTicketId" integer NOT NULL,
    "statusTicket" name NOT NULL
);
 "   DROP TABLE public."statusTicket";
       public         heap    postgres    false            �            1259    18231    statusTicket_statusTicketId_seq    SEQUENCE     �   ALTER TABLE public."statusTicket" ALTER COLUMN "statusTicketId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."statusTicket_statusTicketId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223            �            1259    17796    transaction    TABLE       CREATE TABLE public.transaction (
    "transactionId" integer NOT NULL,
    "transactionCode" name,
    amount numeric NOT NULL,
    "userId" integer NOT NULL,
    "paymentMethodId" integer NOT NULL,
    "ticketId" integer NOT NULL,
    "transactionStatusId" integer NOT NULL
);
    DROP TABLE public.transaction;
       public         heap    postgres    false            �            1259    18230    transaction_transactionId_seq    SEQUENCE     �   ALTER TABLE public.transaction ALTER COLUMN "transactionId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."transaction_transactionId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225            �            1259    17744    user    TABLE     �   CREATE TABLE public."user" (
    "userId" integer NOT NULL,
    "userEmail" name NOT NULL,
    "userName" name NOT NULL,
    "userLastName" name NOT NULL,
    "birthDate" date NOT NULL,
    "userPhone" text
);
    DROP TABLE public."user";
       public         heap    postgres    false            ^          0    17781    airline 
   TABLE DATA           L   COPY public.airline ("airlineId", "airlineName", "airlineCode") FROM stdin;
    public          postgres    false    222   Og       \          0    17771 	   classSeat 
   TABLE DATA           A   COPY public."classSeat" ("classSeatId", "classSeat") FROM stdin;
    public          postgres    false    220   zg       m          0    18234    country 
   TABLE DATA           7   COPY public.country ("countryId", country) FROM stdin;
    public          postgres    false    237   �g       X          0    17732    flightRoute 
   TABLE DATA           �   COPY public."flightRoute" ("flightRouteId", "flightRouteCode", "boardingTime", "originLocation", "finalLocation", "planeId", "airlineId", "gateId", "flightDate", price) FROM stdin;
    public          postgres    false    216   �g       [          0    17751    flightTicket 
   TABLE DATA           i   COPY public."flightTicket" ("ticketId", "flightRoute", "userId", "statusTicketId", "seatId") FROM stdin;
    public          postgres    false    219   7h       W          0    17727 
   flightType 
   TABLE DATA           D   COPY public."flightType" ("flightTypeId", "flightType") FROM stdin;
    public          postgres    false    215   dh       ]          0    17776    gate 
   TABLE DATA           6   COPY public.gate ("gateId", "statusGate") FROM stdin;
    public          postgres    false    221   �h       V          0    17722    location 
   TABLE DATA           f   COPY public.location ("locationId", location, "flightTypeId", "countryId", "airportCode") FROM stdin;
    public          postgres    false    214   �h       `          0    17791    paymentMethod 
   TABLE DATA           Q   COPY public."paymentMethod" ("paymentMethodId", "paymentMethodName") FROM stdin;
    public          postgres    false    224   i       Y          0    17739    plane 
   TABLE DATA           D   COPY public.plane ("planeId", "planeCode", "planeType") FROM stdin;
    public          postgres    false    217   Ki       _          0    17786    statusTicket 
   TABLE DATA           J   COPY public."statusTicket" ("statusTicketId", "statusTicket") FROM stdin;
    public          postgres    false    223   i       a          0    17796    transaction 
   TABLE DATA           �   COPY public.transaction ("transactionId", "transactionCode", amount, "userId", "paymentMethodId", "ticketId", "transactionStatusId") FROM stdin;
    public          postgres    false    225   �i       Z          0    17744    user 
   TABLE DATA           m   COPY public."user" ("userId", "userEmail", "userName", "userLastName", "birthDate", "userPhone") FROM stdin;
    public          postgres    false    218   �i       u           0    0    airline_airlineId_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."airline_airlineId_seq"', 1, true);
          public          postgres    false    226            v           0    0    classSeat_classSeatId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."classSeat_classSeatId_seq"', 2, true);
          public          postgres    false    231            w           0    0    country_countryId_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."country_countryId_seq"', 2, true);
          public          postgres    false    236            x           0    0    flightRoute_flightRouteId_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."flightRoute_flightRouteId_seq"', 2, true);
          public          postgres    false    230            y           0    0    flightTicket_ticketId_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."flightTicket_ticketId_seq"', 162, true);
          public          postgres    false    233            z           0    0    flightType_flightTypeId_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."flightType_flightTypeId_seq"', 2, true);
          public          postgres    false    227            {           0    0    location_locationId_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."location_locationId_seq"', 3, true);
          public          postgres    false    228            |           0    0 !   paymentMethod_paymentMethodId_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public."paymentMethod_paymentMethodId_seq"', 2, true);
          public          postgres    false    232            }           0    0    plane_planeId_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."plane_planeId_seq"', 4, true);
          public          postgres    false    229            ~           0    0    statusTicket_statusTicketId_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."statusTicket_statusTicketId_seq"', 1, true);
          public          postgres    false    235                       0    0    transaction_transactionId_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."transaction_transactionId_seq"', 78, true);
          public          postgres    false    234            �           2606    17785    airline airline_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.airline
    ADD CONSTRAINT airline_pkey PRIMARY KEY ("airlineId");
 >   ALTER TABLE ONLY public.airline DROP CONSTRAINT airline_pkey;
       public            postgres    false    222            �           2606    17775    classSeat classSeatId_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public."classSeat"
    ADD CONSTRAINT "classSeatId_pkey" PRIMARY KEY ("classSeatId");
 H   ALTER TABLE ONLY public."classSeat" DROP CONSTRAINT "classSeatId_pkey";
       public            postgres    false    220            �           2606    18238    country country_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY ("countryId") INCLUDE ("countryId");
 >   ALTER TABLE ONLY public.country DROP CONSTRAINT country_pkey;
       public            postgres    false    237            �           2606    17738    flightRoute flightRoute_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public."flightRoute"
    ADD CONSTRAINT "flightRoute_pkey" PRIMARY KEY ("flightRouteId");
 J   ALTER TABLE ONLY public."flightRoute" DROP CONSTRAINT "flightRoute_pkey";
       public            postgres    false    216            �           2606    17755    flightTicket flightTicket_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."flightTicket"
    ADD CONSTRAINT "flightTicket_pkey" PRIMARY KEY ("ticketId");
 L   ALTER TABLE ONLY public."flightTicket" DROP CONSTRAINT "flightTicket_pkey";
       public            postgres    false    219            �           2606    17731    flightType flightType_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."flightType"
    ADD CONSTRAINT "flightType_pkey" PRIMARY KEY ("flightTypeId");
 H   ALTER TABLE ONLY public."flightType" DROP CONSTRAINT "flightType_pkey";
       public            postgres    false    215            �           2606    17780    gate gate_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.gate
    ADD CONSTRAINT gate_pkey PRIMARY KEY ("gateId");
 8   ALTER TABLE ONLY public.gate DROP CONSTRAINT gate_pkey;
       public            postgres    false    221            �           2606    17726    location location_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY ("locationId");
 @   ALTER TABLE ONLY public.location DROP CONSTRAINT location_pkey;
       public            postgres    false    214            �           2606    17795     paymentMethod paymentMethod_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."paymentMethod"
    ADD CONSTRAINT "paymentMethod_pkey" PRIMARY KEY ("paymentMethodId");
 N   ALTER TABLE ONLY public."paymentMethod" DROP CONSTRAINT "paymentMethod_pkey";
       public            postgres    false    224            �           2606    17743    plane plane_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.plane
    ADD CONSTRAINT plane_pkey PRIMARY KEY ("planeId");
 :   ALTER TABLE ONLY public.plane DROP CONSTRAINT plane_pkey;
       public            postgres    false    217            �           2606    17790    statusTicket statusTicket_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."statusTicket"
    ADD CONSTRAINT "statusTicket_pkey" PRIMARY KEY ("statusTicketId");
 L   ALTER TABLE ONLY public."statusTicket" DROP CONSTRAINT "statusTicket_pkey";
       public            postgres    false    223            �           2606    18279    transaction transaction_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY ("transactionId") INCLUDE ("transactionId");
 F   ALTER TABLE ONLY public.transaction DROP CONSTRAINT transaction_pkey;
       public            postgres    false    225            �           2606    17750    user user_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY ("userId");
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    218            �           2606    17828    flightRoute airlineId    FK CONSTRAINT     �   ALTER TABLE ONLY public."flightRoute"
    ADD CONSTRAINT "airlineId" FOREIGN KEY ("airlineId") REFERENCES public.airline("airlineId") NOT VALID;
 C   ALTER TABLE ONLY public."flightRoute" DROP CONSTRAINT "airlineId";
       public          postgres    false    222    3249    216            �           2606    18239    location countryId    FK CONSTRAINT     �   ALTER TABLE ONLY public.location
    ADD CONSTRAINT "countryId" FOREIGN KEY ("countryId") REFERENCES public.country("countryId") NOT VALID;
 >   ALTER TABLE ONLY public.location DROP CONSTRAINT "countryId";
       public          postgres    false    3257    214    237            �           2606    17823    flightRoute finalLocation    FK CONSTRAINT     �   ALTER TABLE ONLY public."flightRoute"
    ADD CONSTRAINT "finalLocation" FOREIGN KEY ("finalLocation") REFERENCES public.location("locationId") NOT VALID;
 G   ALTER TABLE ONLY public."flightRoute" DROP CONSTRAINT "finalLocation";
       public          postgres    false    214    3233    216            �           2606    17848    flightTicket flightRoute    FK CONSTRAINT     �   ALTER TABLE ONLY public."flightTicket"
    ADD CONSTRAINT "flightRoute" FOREIGN KEY ("flightRoute") REFERENCES public."flightRoute"("flightRouteId") NOT VALID;
 F   ALTER TABLE ONLY public."flightTicket" DROP CONSTRAINT "flightRoute";
       public          postgres    false    3237    219    216            �           2606    17838    flightRoute gateId    FK CONSTRAINT     �   ALTER TABLE ONLY public."flightRoute"
    ADD CONSTRAINT "gateId" FOREIGN KEY ("gateId") REFERENCES public.gate("gateId") NOT VALID;
 @   ALTER TABLE ONLY public."flightRoute" DROP CONSTRAINT "gateId";
       public          postgres    false    221    3247    216            �           2606    17808 #   location location_flightTypeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.location
    ADD CONSTRAINT "location_flightTypeId_fkey" FOREIGN KEY ("flightTypeId") REFERENCES public."flightType"("flightTypeId") NOT VALID;
 O   ALTER TABLE ONLY public.location DROP CONSTRAINT "location_flightTypeId_fkey";
       public          postgres    false    214    215    3235            �           2606    17813    flightRoute originLocation    FK CONSTRAINT     �   ALTER TABLE ONLY public."flightRoute"
    ADD CONSTRAINT "originLocation" FOREIGN KEY ("originLocation") REFERENCES public.location("locationId") NOT VALID;
 H   ALTER TABLE ONLY public."flightRoute" DROP CONSTRAINT "originLocation";
       public          postgres    false    216    3233    214            �           2606    17888    transaction paymentMethodId    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT "paymentMethodId" FOREIGN KEY ("paymentMethodId") REFERENCES public."paymentMethod"("paymentMethodId") NOT VALID;
 G   ALTER TABLE ONLY public.transaction DROP CONSTRAINT "paymentMethodId";
       public          postgres    false    3253    225    224            �           2606    17818    flightRoute planeAssigned    FK CONSTRAINT     �   ALTER TABLE ONLY public."flightRoute"
    ADD CONSTRAINT "planeAssigned" FOREIGN KEY ("planeId") REFERENCES public.plane("planeId") NOT VALID;
 G   ALTER TABLE ONLY public."flightRoute" DROP CONSTRAINT "planeAssigned";
       public          postgres    false    216    3239    217            �           2606    17833    flightRoute planeId    FK CONSTRAINT     �   ALTER TABLE ONLY public."flightRoute"
    ADD CONSTRAINT "planeId" FOREIGN KEY ("planeId") REFERENCES public.plane("planeId") NOT VALID;
 A   ALTER TABLE ONLY public."flightRoute" DROP CONSTRAINT "planeId";
       public          postgres    false    3239    216    217            �           2606    17863    flightTicket statusTicket    FK CONSTRAINT     �   ALTER TABLE ONLY public."flightTicket"
    ADD CONSTRAINT "statusTicket" FOREIGN KEY ("statusTicketId") REFERENCES public."statusTicket"("statusTicketId") NOT VALID;
 G   ALTER TABLE ONLY public."flightTicket" DROP CONSTRAINT "statusTicket";
       public          postgres    false    223    219    3251            �           2606    17893    transaction ticketId    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT "ticketId" FOREIGN KEY ("ticketId") REFERENCES public."flightTicket"("ticketId") NOT VALID;
 @   ALTER TABLE ONLY public.transaction DROP CONSTRAINT "ticketId";
       public          postgres    false    225    219    3243            �           2606    17853    flightTicket userId    FK CONSTRAINT     �   ALTER TABLE ONLY public."flightTicket"
    ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES public."user"("userId") NOT VALID;
 A   ALTER TABLE ONLY public."flightTicket" DROP CONSTRAINT "userId";
       public          postgres    false    3241    219    218            �           2606    17883    transaction userId    FK CONSTRAINT     �   ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES public."user"("userId") NOT VALID;
 >   ALTER TABLE ONLY public.transaction DROP CONSTRAINT "userId";
       public          postgres    false    3241    225    218            ^      x�3�t,�L�KN�L,K����� 7�      \   $   x�3�tM�����L��2�t*-��K-.����� ~�      m      x�3�H-:��ˈ�5�41%��+F��� XV�      X   J   x�U��	�0C��.�B�� t�9�B-!�x��ap.�"�Ct�`O�TcOr��ؙ}Ͽ��W}�x�{��x��      [      x�3�4�4�0��4152�b���� -X�      W   !   x�3��KL���K��2���+I-ʃ�c���� ��	�      ]      x�34�4�r21z\\\ �
      V   8   x�3����M�4BO_.#���̒|N# ���2�(MN��)�(	p������ ff      `   9   x�3�I,�J-ITHIUH.:�2%�$_?%5	Hqq�%�����%g&r��qqq �h�      Y   $   x�3�t42�566�\&���ƺ� �+F��� _�^      _      x�3�;�0'3%�+F��� (�O      a      x������ � �      Z   z   x�M̻
�0��Yz��"m�B�N����-�)�d��'
��Ɂy��%�E{�y�zwyO�m(��_�Q[��Z7ǜ���;`�@6ی�2q�	J-��p=fS�{]j?i06�����ǀ�;o�&�     