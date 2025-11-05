//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:taxi_openapi/src/model/payments_list200_response_items_inner.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_list200_response.g.dart';

/// PaymentsList200Response
///
/// Properties:
/// * [items] 
/// * [nextCursor] 
@BuiltValue()
abstract class PaymentsList200Response implements Built<PaymentsList200Response, PaymentsList200ResponseBuilder> {
  @BuiltValueField(wireName: r'items')
  BuiltList<PaymentsList200ResponseItemsInner>? get items;

  @BuiltValueField(wireName: r'nextCursor')
  String? get nextCursor;

  PaymentsList200Response._();

  factory PaymentsList200Response([void updates(PaymentsList200ResponseBuilder b)]) = _$PaymentsList200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsList200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsList200Response> get serializer => _$PaymentsList200ResponseSerializer();
}

class _$PaymentsList200ResponseSerializer implements PrimitiveSerializer<PaymentsList200Response> {
  @override
  final Iterable<Type> types = const [PaymentsList200Response, _$PaymentsList200Response];

  @override
  final String wireName = r'PaymentsList200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsList200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.items != null) {
      yield r'items';
      yield serializers.serialize(
        object.items,
        specifiedType: const FullType(BuiltList, [FullType(PaymentsList200ResponseItemsInner)]),
      );
    }
    if (object.nextCursor != null) {
      yield r'nextCursor';
      yield serializers.serialize(
        object.nextCursor,
        specifiedType: const FullType.nullable(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentsList200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsList200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(PaymentsList200ResponseItemsInner)]),
          ) as BuiltList<PaymentsList200ResponseItemsInner>;
          result.items.replace(valueDes);
          break;
        case r'nextCursor':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.nextCursor = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentsList200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsList200ResponseBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

